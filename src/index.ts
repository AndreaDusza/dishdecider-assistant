import { fromEvent, throttleTime } from 'rxjs';
import { evaluateCardText } from './logic';
import { getMatchingIngredientsWholeName, getLcMatchesThatDoNotMatchAnException } from './logic';
import { $, UIkit, waitForJquery } from './provided';
import { FoodService, getCurrentSite, isCurrentSiteSupported } from './services';
import { applyDefaultHighlightToCellStyle } from './styles/common';
import { applyBorder } from './styles/general-styles';
import { applyBorderInDirection } from './styles/general-styles';
import { applyOpacity } from './styles/general-styles';
import { applyLikelevelBackgroundColors } from './styles/general-styles';
import { patchTeletalStyles } from './styles/teletal';
import { patchInterfoodStyles } from './styles/interfood';
import { LikeLevel, UserConfig, GlobalSettings } from './userconfig';
import { UndefinedUserConfig } from './userconfig.undefined';
import { AssistantError } from './utils/assistant-error';
import { avgTextLength } from './utils/debug';
import { iife } from './utils/iife';
import { jxItems, jxNthParent } from './utils/jquery-ex';
import { poll, PollTimeoutError } from './utils/poll';
import { sleep } from './utils/sleep';
import { unique } from './utils/unique';

async function main() {
  try {
    if (isCurrentSiteSupported()){
      console.log('DishDecider Assistant script started...');
      const currentSite = getCurrentSite();

      const uc = await getCurrentUserConfig();
      console.log("loaded user config:");
      console.log(uc);
      sanitizeUserConfig(uc); 
      insertFeedbackText(uc);

      console.log('DishDecider Assistant - user preferences:', uc.config);
      mainWithUserConfig(uc);
    }
  } catch (error) {
    console.error('Initialization error', error);
  }
}

type CurrentUserConfig = { name: string, config: UserConfig };

function getTextFromFoodCard(element: JQuery<HTMLElement>) {
  const currentSite = getCurrentSite();
  switch (currentSite) {
      case FoodService.foodora: return element.text();
      default: return element.text();
  }
}

function determineFoodCardsObject(): JQuery<HTMLElement>{
  const currentSite = getCurrentSite();
  switch (currentSite) {
    case FoodService.teletal: return $('.menu-card.uk-card-small');
    case FoodService.pizzaforte: return $('.product');
    case FoodService.ordit: return $('.meal-card');
    case FoodService.wolt: return $('[data-test-id=horizontal-item-card]');
    case FoodService.foodora: return $('.product-tile'); 
    case FoodService.interfood: return $('.cell'); 
    case FoodService.pizzamonkey: return $('.pm-products__product'); 
    case FoodService.egeszsegkonyha: return $('.etlapcella'); 
    default: throw new AssistantError('Assistant error: determineFoodCardsObject not implemented for ' + currentSite);
  }
}

function applyStlyeTag(currentSite: FoodService) {
  switch (currentSite) {
    case FoodService.teletal: {
      patchTeletalStyles(); 
      return;
    }
    case FoodService.pizzaforte: {
      applyBorderInDirection('left','.product', 16); 
      return;
    }
    case FoodService.ordit: {
      applyBorder('.meal-card', 5); 
      return;
    }
    case FoodService.wolt:  {
      applyBorder('[data-test-id=horizontal-item-card]', 5); 
      return;
    }
    case FoodService.interfood: {
      patchInterfoodStyles();
      applyOpacity('.cell', LikeLevel.blacklist, 0.3); 
      applyLikelevelBackgroundColors('.cell');
      return;
    }
    case FoodService.pizzamonkey: {
      applyBorder('.pm-products__product', 5); 
      return;
    }
    case FoodService.egeszsegkonyha: {
      applyOpacity('.etlapcella', LikeLevel.blacklist, 0.3); 
      applyLikelevelBackgroundColors('.etlapcella');
      return;
    }
    case FoodService.foodora: {
      applyBorder('.product-tile', 5); 
      return;
    }
    default: console.warn('applyStlyeTag not implemented for site ' + currentSite);
  }
}

async function getCurrentUserConfig(): Promise<CurrentUserConfig> {
  const storedUserConfigs = await loadUserConfigsFromChromeStorage();

  if (!storedUserConfigs){
    return getDefaultUserConfig();
  } else {
    let selectedProfileId = storedUserConfigs.selectedProfileId;
    const config = storedUserConfigs.profiles.find(i => i.profileId === selectedProfileId) ?? UndefinedUserConfig;
    const name = config.profileName;
    return {name, config};
  }
}

function getDefaultUserConfig(): CurrentUserConfig {
  return { name: UndefinedUserConfig.profileName, config: UndefinedUserConfig };
}

async function loadUserConfigsFromChromeStorage(): Promise<GlobalSettings> {
  let getting = await chrome.storage.sync.get("dishdeciderAssistantConfig");

  getting = transformOptionsObjectToNewFormatIfNeeded(getting);

  return getting.dishdeciderAssistantConfig;
}

//TODO: this code is duplicated unfortunately
function transformOptionsObjectToNewFormatIfNeeded(result: any){
  if (result && result.dishdeciderAssistantConfig){

    //convert version 1.1 to version 1.3
    if (!result.dishdeciderAssistantConfig.version){
      let selProfId = '0';

      let oneProfile = result.dishdeciderAssistantConfig[0];
      oneProfile.profileName="Untitled";
      oneProfile.profileId = selProfId;
      oneProfile.isRegexEnabled = true;

      let result2 = {
        dishdeciderAssistantConfig: {
          version: '1.3',
          selectedProfileId: selProfId,
          profiles: [oneProfile]
        }
      }
      result = result2;
   }
  }
   
  return result;
}


async function checkIngredients(
  $elem: JQuery,
  uc: UserConfig,
) {

  const popupInfo = await iife(async () => {
    try {
      return await poll({
        fn: i => {
          console.log(`Polling ${i}`);
          //There can be multiple spans if I order a multi course menu. That's why I need a loop
          const ingredientLabelSpans = $('span:contains("Összetevők")');

          if (ingredientLabelSpans.length >= 1) {

            const foodTitle = jxItems($('.uk-article-title')).map( i=> {
                return i.text() + '\n\n';
            }).join('');

            const ingredientsString = jxItems(ingredientLabelSpans).map(currIngredientLabelSpan => {
              const currIngredientsString = currIngredientLabelSpan.next().text();
              if (currIngredientsString.length < 3) {
                throw new AssistantError('Assistant error: Ingredients label missing or too short!');
              }
              return currIngredientsString + '\n\n';
            }).join('');

            return {ingredientsString: ingredientsString, foodTitle: foodTitle};
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

  const totalBlacklist = uc.blacklist.concat(uc.warnList);

  const filteredFoundIngredientsItems = 
   getLcMatchesThatDoNotMatchAnException(totalBlacklist, popupInfo.ingredientsString, uc.blacklistExceptions, uc.isRegexEnabled)
   .flatMap(item => 
    uc.isRegexEnabled ? getMatchingIngredientsWholeName(popupInfo.ingredientsString, item, true) : item
  );

  console.log(filteredFoundIngredientsItems);

  const filteredFoundTitleItems = 
    getLcMatchesThatDoNotMatchAnException(totalBlacklist, popupInfo.foodTitle, uc.blacklistExceptions, uc.isRegexEnabled)
    .flatMap(item => 
      uc.isRegexEnabled ? getMatchingIngredientsWholeName(popupInfo.foodTitle, item, false) : item
  );
  
  console.log('filteredFoundTitleItems:');
  console.log(filteredFoundTitleItems);

  const allSusItems = unique(filteredFoundTitleItems.concat(filteredFoundIngredientsItems));

  let feedbackText = "";
  if (allSusItems.length > 0) {
    $elem.css('color', 'red');
    feedbackText = "DishDecider title & ingredient check: ❌ <p style=\"color:red; font-weight:bold\">" + allSusItems.join(', ') + "<\p>";
  } else {
    feedbackText = "DishDecider title & ingredient check: ✔️"
    $elem.css('color', 'green');
  }

  const $newDiv = $(`<div id="fo-assistant-feedback-ingredient-check">${feedbackText}</div>`);
  $newDiv.css({
    'width': '50%', // set a fixed width for the div
    'background-color': 'white',
  });

  $newDiv.insertBefore($('.uk-article-title').first());
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
  $('body').on('click', '.menu-info-button', function (e) {
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
    applyStlyeTag(getCurrentSite());
    checkAllVisibleFoods(2);
  }

  function checkAllVisibleFoods(acceptanceLevel) {
    console.log('Running checkAllVisibleFoods()');
    insertFeedbackText(uc);
    let $allVisibleFoodCardObjects = determineFoodCardsObject();

    //console.log('Number of visible food items: ' + $allVisibleFoodCardObjects.length + ', avg text() length: ' + avgTextLength($allVisibleFoodCardObjects));

    for (const $food of jxItems($allVisibleFoodCardObjects)) {
      const foodText = getTextFromFoodCard($food) ?? '';

      const likeLevel = evaluateCardText(
        foodText,
        uc.config,
        acceptanceLevel,
      );

      if (![FoodService.interfood].includes(getCurrentSite())){
        applyDefaultHighlightToCellStyle($food, likeLevel);
      }
      $food.addClass('fo-assistant-likelevel-' + likeLevel);
    }
  }
}

function sanitizeUserConfig(uc: CurrentUserConfig) {
  (uc.config as any).favList1 = uc.config.favList1.map(item => item.trim()); 
  (uc.config as any).favList2 = uc.config.favList2.map(item => item.trim()); 
  (uc.config as any).warnList = uc.config.warnList.map(item => item.trim()); 
  (uc.config as any).blacklist = uc.config.blacklist.map(item => item.trim()); 
  (uc.config as any).blacklistExceptions = uc.config.blacklistExceptions.map(item => item.trim()); 
  (uc.config as any).favListExceptions = uc.config.favListExceptions.map(item => item.trim()); 
  (uc.config as any).mehList = uc.config.mehList.map(item => item.trim()); 

  const regex1 = new RegExp('[ae]$');
  (uc.config as any).favList1 = uc.config.favList1.concat(uc.config.favList1.filter(i => i.match(regex1)).map(i => i.replace(/a$/,'á').replace(/e$/,'é')));
  (uc.config as any).favList2 = uc.config.favList2.concat(uc.config.favList2.filter(i => i.match(regex1)).map(i => i.replace(/a$/,'á').replace(/e$/,'é')));
  (uc.config as any).warnList = uc.config.warnList.concat(uc.config.warnList.filter(i => i.match(regex1)).map(i => i.replace(/a$/,'á').replace(/e$/,'é')));
  (uc.config as any).blacklist = uc.config.blacklist.concat(uc.config.blacklist.filter(i => i.match(regex1)).map(i => i.replace(/a$/,'á').replace(/e$/,'é')));
  (uc.config as any).blacklistExceptions = uc.config.blacklistExceptions.concat(uc.config.blacklistExceptions.filter(i => i.match(regex1)).map(i => i.replace(/a$/,'á').replace(/e$/,'é')));
  (uc.config as any).favListExceptions = uc.config.favListExceptions.concat(uc.config.favListExceptions.filter(i => i.match(regex1)).map(i => i.replace(/a$/,'á').replace(/e$/,'é')));
  (uc.config as any).mehList = uc.config.mehList.concat(uc.config.mehList.filter(i => i.match(regex1)).map(i => i.replace(/a$/,'á').replace(/e$/,'é')));

}

function insertFeedbackText(uc: CurrentUserConfig){
  const currentSite = getCurrentSite();

  let feedbackText = (uc === undefined || uc.config === UndefinedUserConfig) ?
    `DishDecider Assistant Info: Assistant will NOT run. Could not identify user.` :
    `
      DishDecider Assistant Info: Assistant is running.<br/>
      When scrolling the page, every visible item\'s title will be evaluated.<br/>
      Results will be indicated by color code / opacity.
      Hotkeys: 1 / 2: to be documented.  
    `;

  if (uc === undefined || uc.config === UndefinedUserConfig) return;

  if ([FoodService.teletal].includes(currentSite)){
    feedbackText += 'Ingredients check only happens when the ingredients popup is opened.<br/>';
  }

  // TODO this does not work!
  $("#dishdecider-popup-div").html(feedbackText);
}

// TODO: probably not needed. It is more intuitive if the user selects the profile in the popup or on the dashboard.
function anyElementinTheDomContainsText(text: string){
  return document.body.innerText.includes(text);
}

main();
