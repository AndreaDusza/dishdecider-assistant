// ==UserScript==
// @name         Teletál Assistant
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Indicate unwanted ingredients
// @author       You
// @match        https://www.teletal.hu/etlap*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

//----------------------------------------------------------------

let userConfigArray = [];
const fruitsList = 'gyümölcs|alma|körte|barack|szilva|cseresznye|málna|eper|meggy|citrom|narancs|szőlő|'
+ 'dinnye|kivi|banán|ananász|datolya|mangó|szeder|ribizli|áfonya|'
+ 'barack|kaki|mandarin|karambola|kókusz|lime|pomelo|csipkebogyó|gránátalma|füge|'
+ 'galagonya|hurma|kajszi|kumkvat|licsi|mangosztán|maracuja|nektarin|papaya|passiógyümölcs|'
+ 'pitahaya|pitaja|egres';

// blacklist: instant NO
// warnList: these expressions would match too many items on the main page and hide them unnecessarily
// blacklistExceptions: to allow 'dhal' when 'hal' is blacklisted (but not 'kardhal'). When adding to item to basket, a warning will appear despite the exception, just to be sure.
// mehList: when matched, prevents item from being highlighted as potential favorite
// favList1: absolute best
// favList2: also good
const userConfig1 = {
    userNameToFind: "Hegedűs Tamás László",
    blacklist: [
                'lazac', 'harcsa', 'hekk', 'halfilé', 'halrud', 'rákragu',
                'tonhal', 'szardínia',
                'garnéla', 'polip', 'tenger gyümölcs', 'tengeri gyümölcs', 'kagyló',
                'gomb(a|á)',
                '(sertés|kacsa|liba|csirke)máj',
                'zúza',
                'ceruzabab', 'héjas zöldborsó',
               ],
    warnList: ['hal', 'rák', 'máj',],
    blacklistExceptions: ['[^a-z]dhal', 'kagylótészta', 'kultúrák',],
    mehList: ['tarhonya','főzelék', 'zöldbab', 'csirkeszárny',
             'wok zöldség', 'fahéj',],
    favList1: ['kijevi', 'brassói', 'lyoni', 'floridai', 'borzas',
               'szűz','chilis bab',
               '^(?!.*leves).*(tepsis|házi|falusi|tejföl).*(burgony|krumpli)(?!püré)',
               'bors.*(mártás|szósz)',
               '(' + fruitsList + ').*leves',
               'paradicsomleves',
               'tápiókapuding', 'gyümölcsrizs',
               'édesburgony(a|á)',
               'cheddar',
              ],
    favList2: ['hidasi', 'dijoni', 'mátrai',
               '^(?!.*leves).*(grillezett|bacon).*(burgony|krumpli)(?!püré)',
               'aszalt paradicsom',
               'palak', 'tikka masala',
               'tzatziki', 'tartár',
               'hagym(a|á)',
               'rétes',
              ],
    testingList: [],
};

const userConfig2 = {
    userNameToFind: "Dusza Andrea",
    blacklist: [],
    warnList: [],
    blacklistExceptions: [],
    mehList: ['tarhonya'],
    favList1: ['juhtúró', 'camembert', 'grillezett sajt', 'grill sajt', 'tápiókapuding', 'rák', 'lazac'],
    favList2: ['aszalt paradicsom'],
    testingList: [],
};

userConfigArray.push(userConfig1);
userConfigArray.push(userConfig2);

(function() {
    'use strict';

     //alert('Tampermonkey script started...');
    console.log('Tampermonkey script started...');

    var $mainTable = $('section:contains("Reggeli")').first();
    //var $mainTable = $('table:contains("Reggeli")').first();
    //var $mainTable = $('#etlap');

    var uc;
    userConfigArray.forEach(function(item) {
        let userNameSpans = $('span:contains("' + item.userNameToFind+ '")');
        if (userNameSpans.length > 0){
           uc = item;
        }
    });

    var newDivText = '';
    var $newDiv;

    if (uc == null || typeof uc === 'undefined'){
        newDivText = "Tampermonkey script will NOT run. Could not identify user.";
    } else {
        newDivText = "Tampermonkey script will run based on the preferences of " + uc.userNameToFind + ".<br/> "
            + "When pressing key 1/2, every visible item's title will be evaluated. Results will be indicated by color code / opacity.<br/> "
            + "Ingredients check only happens when an item is added to the basket.<br/>" ;
    }

    $newDiv = $('<div><br/>' + newDivText + '</div>');

    $newDiv.css({
        'width': '50%', // set a fixed width for the div
        'margin-left': 'auto', // center the div horizontally
        'margin-right': 'auto' // center the div horizontally
    });

    $newDiv.insertBefore($mainTable);

    if (uc == null || typeof uc === 'undefined'){
        return;
    }

     $('body').delegate('.menu-button-plus','click',function(e) {
         e.preventDefault();

         var $elem = $(this);
         $elem = $elem.parent();
         $elem = $elem.parent();
         $elem = $elem.parent();
         console.log('Menu element tagName:', $elem.prop('tagName') + '; class: ' +$elem.attr('class'));

         var $infoButton = $elem.find('.menu-info-button').first();
         console.log('Info button:' + $infoButton);
         UIkit.toggle($infoButton).toggle();  //.click() did not work

         var modal = UIkit.modal('#info-modal');
         setTimeout(function() {
             if (modal.isToggled()) {
                 modal.hide();
             }

             setTimeout(function() {

                 //There can be multiple spans if I order a multi course menu. That's why I need a loop
                 var ingredientLabelSpans = $('span:contains("Összetevők")');
                 var ingredientsString = '';

                 //console.log(ingredientLabelSpans.length);
                 if (ingredientLabelSpans.length < 1){
                     alert("Tampermonkey script hiba: összetevők címke hiányzik! ");
                     return;
                 }

                 ingredientLabelSpans.each(function() {
                     var currIngredientLabelSpan = $(this);
                     var currIngredientListSpan = currIngredientLabelSpan.next();
                     var currIngredientsString = currIngredientListSpan.text();
                     if (currIngredientsString.length < 20){
                         alert("Tampermonkey script hiba: összetevők listája hiányzik / túl rövid! ");
                         return;
                     }
                     //console.log(currIngredientsString);
                     ingredientsString += currIngredientsString + '\n\n';
                 });

                 var foundItems = [];
                 let totalBlacklist = uc.blacklist.concat(uc.warnList);
                 totalBlacklist.forEach(function(item) {
                     //let regex = '[a-z ]*' + item.toLowerCase() + '[a-z ]*';
                     let regex = new RegExp("\\b[a-záéíóóöőúüű \p{L}]*" + item.toLowerCase() + "[a-záéíóóöőúüű \p{L}]*\\b", "g");
                     let matchObj = ingredientsString.toLowerCase().match(regex);
                     if (matchObj != null) {
                         console.log(matchObj);
                         foundItems = foundItems.concat(matchObj);
                     }
                 });

                 console.log("founditems: " + foundItems);

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

    $(document).keydown(function(event) {
        if (event.which == 49) {  // 49 is the keycode for the number 1
            checkAllVisibleFoods(1);
        } else if (event.which == 50) {  // 50 is the keycode for the number 2
            checkAllVisibleFoods(2);
        } else if (event.which == 51) {  // 51 is the keycode for the number 3, no purpose at the moment
            checkAllVisibleFoods(3);
        }

    });

    function checkAllVisibleFoods(acceptanceLevel){
        console.log("Running checkAllVisibleFoods()");
        let $allVisibleFoods = $('.menu-card.uk-card-small');
        //console.log($allVisibleFoods);
        $allVisibleFoods.each(function() {
            let $food = $(this);

            //is blacklisted?
            if (containsLcMatch(uc.blacklist, $food.text()) && !containsLcMatch(uc.blacklistExceptions, $food.text())){
                $food.css('opacity', '0.2');
                //$food.css('border', '1px solid red');
                return;
            }

            //testing
            if (containsLcMatch(uc.testingList, $food.text()) && !containsLcMatch(uc.blacklistExceptions, $food.text())){
                $food.css('color', 'yellow');
                console.log('Test result: ' + $food.text());
                return;
            }

            //warning
            if (containsLcMatch(uc.warnList, $food.text()) && !containsLcMatch(uc.blacklistExceptions, $food.text())){
                $food.css('color', 'orange');
                console.log('Warning: ' + $food.text());
                return;
            }

            //is meh?
            if (containsLcMatch(uc.mehList, $food.text())){
                return;
            }

            //is fav 1 ?
            if (containsLcMatch(uc.favList1, $food.text())){
                $food.css('color', 'blue');
                return;
            }

            //is fav2 ?
            if (acceptanceLevel >= 2 ){
                if (containsLcMatch(uc.favList2, $food.text())){
                    $food.css('color', 'purple');
                    return;
                }
            }
        });
    }

    function lcMatch(e1, e2){
        return e1.toLowerCase().match(e2.toLowerCase()) != null;
    }

    function containsLcMatch(list1, foodText){
        for (const listItem1 of list1) {
            if (lcMatch(foodText, listItem1)) {
                //console.log("Found match in containsLcMatch: " + foodObj.text() + " " + listItem1);
                return true;
            }
        }
        return false;
    }

})();
