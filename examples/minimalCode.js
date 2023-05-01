// ==UserScript==
// @name         Minimal Food Order Assistant - Learning Sample
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Indicate unwanted ingredients
// @author       You
// @match        https://www.teletal.hu/etlap*
// @match        https://pizzaforte.hu/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// ----------------------------------------------------------------

// Constants

const fruitsList = 'gyümölcs|alma|körte|barack|szilva|cseresznye|málna|eper|meggy|citrom|narancs|szőlő|'
+ 'dinnye|kivi|banán|ananász|datolya|mangó|szeder|ribizli|áfonya|'
+ 'barack|kaki|mandarin|karambola|kókusz|lime|pomelo|csipkebogyó|gránátalma|füge|'
+ 'galagonya|hurma|kajszi|kumkvat|licsi|mangosztán|maracuja|nektarin|papaya|passiógyümölcs|'
+ 'pitahaya|pitaja|egres';

const FishSpeciesList = [
    'ponty', 'süllő', 'harcsa', 'tokhal', 'lazac', 'pisztráng', 'tonhal',
    'pangasius', 'tőkehal', 'keszeg', 'szardínia', 'makréla', 'hering', 'hekk', 'sügér',
    'tilápia',
];

const USER_CONFIGS = [
{
    userNamesToFind: ["Minimal Food Order Assistant Test User"],
    blacklist: ['gomb(a|á)', 'milánói',
                '(sertés|kacsa|liba|csirke|szárnyas).?máj',
               ].concat(FishSpeciesList),
    favList1: ['kijevi', 'brassói', 'lyoni', 'floridai', 'borzas',
               'bors.*(mártás|szósz)',
               '(' + fruitsList + ').*leves',
               'cheddar',
               'padlizsánkrém',
              ],
},
{
    userNamesToFind: ["Dusza Andrea"],
    blacklist: [],
    favList1: ['juhtúró', 'camembert', 'grill.{0,10}sajt', 'tápiókapuding', 'garnéla', 'lazac'],
}
];

// ----------------------------------------------------------------

// This is an IIFE: Immediately Invoked Function Expression
(function() {
    'use strict';

    console.log('Tampermonkey script started...');

    let currentURL = location.href;
    let uc = USER_CONFIGS[0];

    insertAssistantInformationTextBeforeElement(uc.userNamesToFind[0], determineMainTableElement(currentURL));

    // Setup event hander: every time when user presses key '2', insertAssistantInformationTextBeforeElement() and checkAllVisibleFoods() will run.
    // It is enough to run the below lines only once inside the IIFE, and the event handler will be triggered at every key press, as long as the page is not refreshed. 
    $(document).keydown(function(event) {
        if (event.which == 50) {  // 50 is the keycode for the number 2
            insertAssistantInformationTextBeforeElement(uc.userNamesToFind[0], determineMainTableElement(currentURL));
            checkAllVisibleFoods();
        }
    });

    function checkAllVisibleFoods(){
        console.log("Running checkAllVisibleFoods()");

        //list of food card elements
        let $allVisibleFoodCards = determineFoodCardElementsObject(currentURL);

        //console.log($allVisibleFoodCards);
        $allVisibleFoodCards.each(function() {
            let $foodCard = $(this);

            //is blacklisted?
            if (containsLcMatch(uc.blacklist, $foodCard.text())){
                $foodCard.css('opacity', '0.2');
                return;
            }

            //is fav?
            if (containsLcMatch(uc.favList1, $foodCard.text())){
                $foodCard.css('color', 'blue');
                return;
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

    function determineMainTableElement(url){
        if (url.includes('https://www.teletal.hu')) {
            return $('section:contains("Reggeli")').first();
        } else if (url.includes('https://pizzaforte.hu')) {
            return $('.container.content-top').first();
        } else {
            throw new AssistantError('Assistant error: Unknown URL ' + url);
        }
    }

    function determineFoodCardElementsObject(url){
        if (url.includes('https://www.teletal.hu')) {
            return $('.menu-card.uk-card-small');
        } else if (url.includes('https://pizzaforte.hu')) {
            return $('.product');
        } else {
            throw new AssistantError('Assistant error: Unknown URL ' + url);
        }
    }

    function insertAssistantInformationTextBeforeElement(userName, targetElement){
        let newDivText = "Tampermonkey script is running based on the preferences of " + userName + ".<br/> "
            + "When pressing key 2, every visible item's title will be evaluated. Results will be indicated by color code / opacity.<br/> " ;

        // If info text is already on the page, do not insert again
        if (anyElementinTheDomContainsText(newDivText.substring(0,30)))
            return;

        let $newDiv = $('<div><br/>' + newDivText + '</div>');

        $newDiv.css({
            'width': '50%', // set a fixed width for the div
            'margin-left': 'auto', // center the div horizontally
            'margin-right': 'auto', // center the div horizontally
            'background-color' : 'white',
            'color' : 'black'
        });

        $newDiv.insertBefore(targetElement);
    }

    function anyElementinTheDomContainsText(text){
         return $(`*:contains(${CSS.escape(text)})`).length > 0;
    }

})();
