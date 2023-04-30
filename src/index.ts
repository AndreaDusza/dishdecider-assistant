import * as $ from 'jquery';
import UIkit from 'uikit';
import { evaluateCardText } from './logic';
import { LikeLevel, UserConfig } from './userconfig';
import { AndiConfig } from './userconfig.andi';
import { HegeConfig } from './userconfig.hege';
import { UnreachableCaseError } from './utils';

function main() {
  try {
    //alert('Tampermonkey script started...');
    console.log('Tampermonkey script started...');

    const uc = getCurrentUserConfig();
    if (uc === null || uc === undefined) {
      insertFeedbackText('Tampermonkey script will NOT run. Could not identify user.');
      return;
    } else {
      insertFeedbackText('Tampermonkey script will run based on the preferences of ' + uc.userNameToFind + '.<br/> '
        + 'When pressing key 1/2, every visible item\'s title will be evaluated. Results will be indicated by color code / opacity.<br/> '
        + 'Ingredients check only happens when an item is added to the basket.<br/>');
    }
    runWithUserConfig(uc);
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

function runWithUserConfig(uc: UserConfig) {
  $('body').delegate('.menu-button-plus', 'click', function (e) {
    e.preventDefault();

    var $elem = $(this);
    $elem = $elem.parent();
    $elem = $elem.parent();
    $elem = $elem.parent();
    console.log('Menu element tagName:', $elem.prop('tagName') + '; class: ' + $elem.attr('class'));

    var $infoButton = $elem.find('.menu-info-button').first();
    console.log('Info button:' + $infoButton);
    UIkit.toggle($infoButton).toggle();  //.click() did not work

    var modal = UIkit.modal('#info-modal');
    setTimeout(function () {
      if (modal.isToggled()) {
        modal.hide();
      }

      setTimeout(function () {

        //There can be multiple spans if I order a multi course menu. That's why I need a loop
        var ingredientLabelSpans = $('span:contains("Összetevők")');
        var ingredientsString = '';

        //console.log(ingredientLabelSpans.length);
        if (ingredientLabelSpans.length < 1) {
          alert('Tampermonkey script hiba: összetevők címke hiányzik! ');
          return;
        }

        ingredientLabelSpans.each(function () {
          var currIngredientLabelSpan = $(this);
          var currIngredientListSpan = currIngredientLabelSpan.next();
          var currIngredientsString = currIngredientListSpan.text();
          if (currIngredientsString.length < 20) {
            alert('Tampermonkey script hiba: összetevők listája hiányzik / túl rövid! ');
            return;
          }
          //console.log(currIngredientsString);
          ingredientsString += currIngredientsString + '\n\n';
        });

        var foundItems = [];
        let totalBlacklist = uc.blacklist.concat(uc.warnList);
        totalBlacklist.forEach(function (item) {
          //let regex = '[a-z ]*' + item.toLowerCase() + '[a-z ]*';
          let regex = new RegExp('\\b[a-záéíóóöőúüű \p{L}]*' + item.toLowerCase() + '[a-záéíóóöőúüű \p{L}]*\\b', 'g');
          let matchObj = ingredientsString.toLowerCase().match(regex);
          if (matchObj != null) {
            console.log(matchObj);
            foundItems = foundItems.concat(matchObj);
          }
        });

        console.log('founditems: ' + foundItems);

        if (foundItems.length > 0) {
          foundItems = [...new Set(foundItems)]; //remove duplicates
          alert('FIGYELMEZTETÉS: ' + foundItems.join(', ') + '\n\n' + ingredientsString);
          $elem.css('color', 'red');
        } else {
          /*if (modal.isToggled()) {
              modal.hide();
          }*/
          $elem.css('color', 'green');
        }

      }, 1000);  //30 ms is too small, 100 is sometimes too small, 300 looks OK but sometimes the UI freezes, 500 sometimes does not find ingredients label, is 1000 enough?

    }, 30);


    return false;
  });

  $(document).keydown(function (event) {
    if (event.which == 49) {  // 49 is the keycode for the number 1
      checkAllVisibleFoods(1);
    } else if (event.which == 50) {  // 50 is the keycode for the number 2
      debugger;
      checkAllVisibleFoods(2);
    } else if (event.which == 51) {  // 51 is the keycode for the number 3, no purpose at the moment
      checkAllVisibleFoods(3);
    }

  });

  function checkAllVisibleFoods(acceptanceLevel) {
    console.log('Running checkAllVisibleFoods()');
    let $allVisibleFoods = $('.menu-card.uk-card-small');
    //console.log($allVisibleFoods);
    $allVisibleFoods.each(function () {
      let $food = $(this);
      const likeLevel = evaluateCardText(
        $food.text(),
        uc,
        acceptanceLevel,
      );
      switch (likeLevel) {
        case LikeLevel.blacklist:
          $food.css('opacity', '0.2');
          break;
        case LikeLevel.test:
          console.log('Test result: ' + $food.text());
          $food.css('color', 'yellow');
          break;
        case LikeLevel.warn:
          $food.css('color', 'orange');
          console.log('Warning: ' + $food.text());
          break;
        case LikeLevel.neutral:
          break;
        case LikeLevel.favorite1:
          $food.css('color', 'blue');
          break;
        case LikeLevel.favorite2:
          $food.css('color', 'purple');
          break;
        default:
          throw new UnreachableCaseError(likeLevel);
      }
    });
  }
};

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
