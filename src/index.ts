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
    const uc = location.href.includes("https://www.teletal.hu") ? getCurrentUserConfig() : getDefaultUserConfig();
    if (location.href.includes("https://www.teletal.hu")){
        if (uc === undefined) {
            insertFeedbackText('Tampermonkey script will NOT run. Could not identify user.');
            return;
        } else {
            insertFeedbackText('Tampermonkey script will run based on the preferences of ' + uc.userNameToFind + '.<br/> '
            + 'When pressing key 1/2, every visible item\'s title will be evaluated. Results will be indicated by color code / opacity.<br/> '
            + 'Ingredients check only happens when an item is added to the basket.<br/>');
        }
    } else if (uc === undefined) {
        throw new AssistantError('Tampermonkey hiba: alapértelmezett felhasználó nincs definiálva');
    }
    mainWithUserConfig(uc);
  } catch (error) {
    console.error('Initialization error', error);
  }
}


function getCurrentUserConfig(): UserConfig | undefined {
  const UserConfigs = [AndiConfig, HegeConfig];
  return UserConfigs.find(uc => {
    let userNameSpans = $('span:contains("' + uc.userNameToFind + '")');
    return userNameSpans.length > 0;
  });
}

function getDefaultUserConfig(): UserConfig {
    return HegeConfig;
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
        throw new AssistantError('Tampermonkey script hiba: összetevők címke hiányzik!');
      }
      throw error;
    }
  });

  const ingredientsString = jxItems(ingredientLabelSpans).map(currIngredientLabelSpan => {
    const currIngredientsString = currIngredientLabelSpan.next().text();
    if (currIngredientsString.length < 20) {
      throw new AssistantError('Tampermonkey script hiba: összetevők listája hiányzik / túl rövid! ');
    }
    return currIngredientsString + '\n\n';
  }).join('');

  const totalBlacklist = uc.blacklist.concat(uc.warnList);
  const foundItems = unique(totalBlacklist.flatMap(item => {
    //let regex = '[a-z ]*' + item.toLowerCase() + '[a-z ]*';
    const regex = new RegExp('\\b[a-záéíóóöőúüű \p{L}]*' + item.toLowerCase() + '[a-záéíóóöőúüű \p{L}]*\\b', 'g');
    return ingredientsString.toLowerCase().match(regex) ?? [];
  }));

  console.log('founditems: ' + foundItems);

  if (foundItems.length > 0) {
    alert('FIGYELMEZTETÉS: ' + foundItems.join(', ') + '\n\n' + ingredientsString);
    $elem.css('color', 'red');
  } else {
    /*if (modal.isToggled()) {
        modal.hide();
    }*/
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


function mainWithUserConfig(uc: UserConfig) {
  $('body').on('click', '.menu-button-plus', function (e) {
    e.preventDefault();
    fireCheckIngredients(jxNthParent($(this), 3), uc);
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
  })
  function refreshColoring() {
    patchTeletalStyles();
    patchPizzaforteStyles();
    checkAllVisibleFoods(2);
  }

  function checkAllVisibleFoods(acceptanceLevel) {
    console.log('Running checkAllVisibleFoods()');
    let $allVisibleFoods;

    if (location.href.includes("https://www.teletal.hu")){
      $allVisibleFoods = $('.menu-card.uk-card-small');
    } else if (location.href.includes("https://pizzaforte.hu")){
      $allVisibleFoods = $('.product');
    } else if (location.href.includes("https://wolt.com")){
      $allVisibleFoods = $('.sc-8c9b94e6-2');
    } else if (location.href.includes("https://app.ordit.hu")){
      $allVisibleFoods = $('.food-card');
    } else if (location.href.includes("https://www.foodora.hu")){
      $allVisibleFoods = $('.product-button-overlay');
      //TODO: handle the fact that food name is in aria-label. The value of .text() is empty
    } else {
      throw new AssistantError('Tampermonkey script hiba: ismeretlen URL ' + location.href);
    }

    console.log('Number of visible food items: ' + $allVisibleFoods.length + ', avg text() length: ' + avgTextLength($allVisibleFoods));

    for (const $food of jxItems($allVisibleFoods)) {
      const foodText = $food.text();

      const likeLevel = evaluateCardText(
        foodText,
        uc,
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

function insertFeedbackText(text: string) {
  var $mainTable = $('section:contains("Reggeli")').first();
  //var $mainTable = $('table:contains("Reggeli")').first();
  //var $mainTable = $('#etlap');

  const $newDiv = $('<div><br/>' + text + '</div>');

  $newDiv.css({
    'width': '50%', // set a fixed width for the div
    'margin-left': 'auto', // center the div horizontally
    'margin-right': 'auto', // center the div horizontally
  });

  $newDiv.insertBefore($mainTable);
}

main();
