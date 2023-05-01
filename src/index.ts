import $ from 'jquery';

import { fromEvent, throttleTime } from 'rxjs';
import { evaluateCardText } from './logic';
import { applyHighlightToCellStyle } from './styles/common';
import { patchPizzaforteStyles } from './styles/pizzaforte';
import { patchTeletalStyles } from './styles/teletal';
import { UIkit } from './teletal';
import { LikeLevel, UserConfig } from './userconfig';
import { AndiConfig } from './userconfig.andi';
import { HegeConfig } from './userconfig.hege';
import { TestUserConfig } from './userconfig.testuser';
import { avgTextLength } from './utils/debug';
import { iife } from './utils/iife';
import { jxItems, jxNthParent } from './utils/jquery-ex';
import { poll, PollTimeoutError } from './utils/poll';
import { sleep } from './utils/sleep';
import { unique } from './utils/unique';

function main() {
  try {
    //alert('Tampermonkey script started...');
    console.log('Tampermonkey script started...');
    const uc = getCurrentUserConfig();
    insertFeedbackText(uc);

    console.log(`Food Order Assistant - user name: ${uc.name}`);
    console.log('Food Order Assistant - user preferences:', uc.config);
    mainWithUserConfig(uc);
  } catch (error) {
    console.error('Initialization error', error);
  }
}

type CurrentUserConfig = { name: string, config: UserConfig };

function getCurrentUserConfig(): CurrentUserConfig {
  const storedUserConfigs = loadUserConfigsFromStorage();
  const UserConfigs = [...storedUserConfigs, HegeConfig, AndiConfig];
  for (const config of UserConfigs) {
    for (const name of config.userNamesToFind) {
      if (anyElementinTheDomContainsText(name)){
        return { name, config };
      }
    }
  }
  return getDefaultUserConfig(storedUserConfigs);
}

function getDefaultUserConfig(storedUserConfigs: UserConfig[]): CurrentUserConfig {
  if (storedUserConfigs.length <= 0) {
    return { name: TestUserConfig.userNamesToFind[0], config: TestUserConfig };
  }
  const config = storedUserConfigs[0];
  const name = config.userNamesToFind[0] ?? 'Unnamed User';
  return { name, config };
}

function loadUserConfigsFromStorage(): UserConfig[] {
  const setting = localStorage.getItem('food-order-assistant-config');
  if (!setting) {
    return [];
  }
  return JSON.parse(setting);
}

class AssistantError extends Error {}

async function checkIngredients(
  $elem: JQuery,
  uc: UserConfig,
) {

  console.log('Menu element tagName:', $elem.prop('tagName') + '; class: ' + $elem.attr('class'));

  const $infoButton = $elem.find('.menu-info-button').first();
  console.log('Info button:' + $infoButton);
  UIkit.toggle($infoButton).toggle();  //.click() did not work

  await sleep(30);

  UIkit.modal('#info-modal').hide();

  const ingredientLabelSpans = await iife(async () => {
    try {
      return await poll({
        fn: i => {
          console.log(`Polling ${i}`);
          //There can be multiple spans if I order a multi course menu. That's why I need a loop
          const ingredientLabelSpans = $('span:contains("Összetevők")');

          //console.log(ingredientLabelSpans.length);
          if (ingredientLabelSpans.length >= 1) {
            return ingredientLabelSpans;
          }
        },
        timeout: 5000,
      });
    } catch (error) {
      if (error instanceof PollTimeoutError) {
        throw new AssistantError('Assistant error: Ingredients label missing!');
      }
      throw error;
    }
  });

  const ingredientsString = jxItems(ingredientLabelSpans).map(currIngredientLabelSpan => {
    const currIngredientsString = currIngredientLabelSpan.next().text();
    if (currIngredientsString.length < 20) {
      throw new AssistantError('Assistant error: Ingredients label missing or too short!');
    }
    return currIngredientsString + '\n\n';
  }).join('');

  const totalBlacklist = uc.blacklist.concat(uc.warnList);
  const foundItems = unique(totalBlacklist.flatMap(item => {
    const regex = new RegExp('\\b[a-záéíóóöőúüű \p{L}]*' + item.toLowerCase() + '[a-záéíóóöőúüű \p{L}]*\\b', 'g');
    return ingredientsString.toLowerCase().match(regex) ?? [];
  }));

  console.log('founditems: ' + foundItems);

  if (foundItems.length > 0) {
    alert('WARNING: ' + foundItems.join(', ') + '\n\n' + ingredientsString);
    $elem.css('color', 'red');
  } else {
    $elem.css('color', 'green');
  }
}

function fireCheckIngredients($elem: JQuery, uc: UserConfig) {
  checkIngredients($elem, uc).catch(error => {
    if (error instanceof AssistantError) {
      alert(error.message);
    } else {
      console.error(error);
    }
  });
}


function mainWithUserConfig(uc: CurrentUserConfig) {
  $('body').on('click', '.menu-button-plus', function (e) {
    e.preventDefault();
    fireCheckIngredients(jxNthParent($(this), 3), uc.config);
    return false;
  });

  $(document).on('keydown', event => {
    const { key } = event;
    if (['1', '2'].includes(key as any)) {
      checkAllVisibleFoods(Number(key));
    }
  });

  fromEvent(window, 'scroll').pipe(
    throttleTime(1000, undefined, { leading: false, trailing: true }),
  ).subscribe(() => {
    refreshColoring();
  });
  $(document).on('loaded', () => {
    refreshColoring();
  });

  function refreshColoring() {
    patchTeletalStyles();
    patchPizzaforteStyles();
    checkAllVisibleFoods(2);
  }

  function checkAllVisibleFoods(acceptanceLevel) {
    console.log('Running checkAllVisibleFoods()');
    insertFeedbackText(uc);
    let $allVisibleFoodCardObjects = determineFoodCardsObject(location.href);

    console.log('Number of visible food items: ' + $allVisibleFoodCardObjects.length + ', avg text() length: ' + avgTextLength($allVisibleFoodCardObjects));

    for (const $food of jxItems($allVisibleFoodCardObjects)) {
      const foodText = $food.text();

      const likeLevel = evaluateCardText(
        foodText,
        uc.config,
        acceptanceLevel,
      );
      switch (foodText) {
        case LikeLevel.test:
          console.log('Test result: ' + foodText);
          break;
        case LikeLevel.warn:
          console.log('Warning: ' + foodText);
          break;
      }
      applyHighlightToCellStyle($food, likeLevel);
    }
  }
}

function determineFoodCardsObject(url: string){
  if (url.includes('https://www.teletal.hu')) {
    return $('.menu-card.uk-card-small');  //looks great
  } else if (url.includes('https://pizzaforte.hu')) {
    return $('.product');                  //looks great
  } else if (url.includes('https://wolt.com')) {
    return $('.sc-8c9b94e6-2');            //opacity change works, but no border
  } else if (url.includes('https://app.ordit.hu')) {
    return $('.food-card');                //looks OK
  } else if (url.includes('https://www.foodora.hu')) {
    return $('.product-button-overlay');   //NOT working at all
    //TODO: handle the fact that food name is in aria-label. The value of .text() is empty
  } else {
    throw new AssistantError('Assistant error: Unknown URL ' + url);
  }
}

function determineMainTableElement(url: string){
  if (url.includes('https://www.teletal.hu')) {
      return $('section:contains("Reggeli")').first();
  } else if (url.includes('https://pizzaforte.hu')) {
      return $('.container.content-top').first();
  } else {
      console.log('determineMainTableElement not implemented for URL ' + url);
  }
}

function insertFeedbackText(uc: CurrentUserConfig){
  var $mainTable = determineMainTableElement(location.href);

  if ($mainTable === undefined) return;

  let feedbackText = (uc === undefined) ? 
    'Food Order Assistant Info: Tampermonkey script will NOT run. Could not identify user.' :
    `Food Order Assistant Info: Tampermonkey script is running based on the preferences of ${uc.name}.<br/> `
      + 'When pressing key 1/2, every visible item\'s title will be evaluated. Results will be indicated by color code / opacity.<br/> ';

  if (uc === undefined) return;

  if (location.href.includes('https://www.teletal.hu')){
    feedbackText += 'Ingredients check only happens when an item is added to the basket.<br/>';
  }

  insertFeedbackTextBeforeElementIfNeeded($mainTable, feedbackText);
}

function insertFeedbackTextBeforeElementIfNeeded($mainTable: JQuery, text: string) {

  //This only works if the first 30 characters of the text are distinctive, and it has nothing to escape
  if (anyElementinTheDomContainsText(text.substring(0,30))){
    return;
  }

  console.log('Inserting Assistant Information text...');

  const $newDiv = $('<div><br/>' + text + '</div>');

  $newDiv.css({
    'width': '50%', // set a fixed width for the div
    'margin-left': 'auto', // center the div horizontally
    'margin-right': 'auto', // center the div horizontally
    'background-color': 'white',
    'color': 'black'
  });

  $newDiv.insertBefore($mainTable);
}

function anyElementinTheDomContainsText(text: string){
  return $(`*:contains(${CSS.escape(text)})`).length > 0;
}

main();
