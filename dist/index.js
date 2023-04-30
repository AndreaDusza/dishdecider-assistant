(function (UIkit, $) {
    'use strict';

    function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

    var UIkit__default = /*#__PURE__*/_interopDefaultCompat(UIkit);

    const FruitsRegex = 'gyümölcs|alma|körte|barack|szilva|cseresznye|málna|eper|meggy|citrom|narancs|szőlő|'
        + 'dinnye|kivi|banán|ananász|datolya|mangó|szeder|ribizli|áfonya|'
        + 'barack|kaki|mandarin|karambola|kókusz|lime|pomelo|csipkebogyó|gránátalma|füge|'
        + 'galagonya|hurma|kajszi|kumkvat|licsi|mangosztán|maracuja|nektarin|papaya|passiógyümölcs|'
        + 'pitahaya|pitaja|egres';
    const LikeLevel = {
        favorite1: 'favorite1',
        favorite2: 'favorite2',
        neutral: 'neutral',
        test: 'test',
        warn: 'warn',
        blacklist: 'blacklist',
    };

    function evaluateCardText(foodDescription, userConfig, acceptanceLevel) {
        //is blacklisted?
        if (containsLcMatch(userConfig.blacklist, foodDescription) && !containsLcMatch(userConfig.blacklistExceptions, foodDescription)) {
            return LikeLevel.blacklist;
        }
        //testing
        if (containsLcMatch(userConfig.testingList, foodDescription) && !containsLcMatch(userConfig.blacklistExceptions, foodDescription)) {
            console.log('Test result: ' + foodDescription);
            return LikeLevel.test;
        }
        //warning
        if (containsLcMatch(userConfig.warnList, foodDescription) && !containsLcMatch(userConfig.blacklistExceptions, foodDescription)) {
            console.log('Warning: ' + foodDescription);
            return LikeLevel.warn;
        }
        //is meh?
        if (containsLcMatch(userConfig.mehList, foodDescription)) {
            return LikeLevel.neutral;
        }
        //is fav 1 ?
        if (containsLcMatch(userConfig.favList1, foodDescription)) {
            return LikeLevel.favorite1;
        }
        //is fav2 ?
        if (acceptanceLevel >= 2) {
            if (containsLcMatch(userConfig.favList2, foodDescription)) {
                return LikeLevel.favorite2;
            }
        }
        return LikeLevel.neutral;
    }
    function lcMatch(e1, e2) {
        return e1.toLowerCase().match(e2.toLowerCase()) != null;
    }
    function containsLcMatch(list1, foodText) {
        for (const listItem1 of list1) {
            if (lcMatch(foodText, listItem1)) {
                //console.log("Found match in containsLcMatch: " + foodObj.text() + " " + listItem1);
                return true;
            }
        }
        return false;
    }

    const AndiConfig = {
        userNameToFind: "Dusza Andrea",
        blacklist: [],
        warnList: [],
        blacklistExceptions: [],
        mehList: ['tarhonya'],
        favList1: ['juhtúró', 'camembert', 'grillezett sajt', 'grill sajt', 'tápiókapuding', 'rák', 'lazac'],
        favList2: ['aszalt paradicsom'],
        testingList: [],
    };

    const HegeConfig = {
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
        mehList: ['tarhonya', 'főzelék', 'zöldbab', 'csirkeszárny',
            'wok zöldség', 'fahéj',],
        favList1: ['kijevi', 'brassói', 'lyoni', 'floridai', 'borzas',
            'szűz', 'chilis bab',
            '^(?!.*leves).*(tepsis|házi|falusi|tejföl).*(burgony|krumpli)(?!püré)',
            'bors.*(mártás|szósz)',
            '(' + FruitsRegex + ').*leves',
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

    class UnreachableCaseError extends Error {
        constructor(value) {
            super("Unreachable case: " + value);
        }
    }

    function main() {
        try {
            //alert('Tampermonkey script started...');
            console.log('Tampermonkey script started...');
            const uc = getCurrentUserConfig();
            if (uc === null || uc === undefined) {
                insertFeedbackText("Tampermonkey script will NOT run. Could not identify user.");
                return;
            }
            else {
                insertFeedbackText("Tampermonkey script will run based on the preferences of " + uc.userNameToFind + ".<br/> "
                    + "When pressing key 1/2, every visible item's title will be evaluated. Results will be indicated by color code / opacity.<br/> "
                    + "Ingredients check only happens when an item is added to the basket.<br/>");
            }
            runWithUserConfig(uc);
        }
        catch (error) {
            console.error("Initialization error", error);
        }
    }
    function getCurrentUserConfig() {
        const UserConfigs = [AndiConfig, HegeConfig];
        return UserConfigs.find(uc => {
            let userNameSpans = $('span:contains("' + uc.userNameToFind + '")');
            return userNameSpans.length > 0;
        });
    }
    function runWithUserConfig(uc) {
        $('body').delegate('.menu-button-plus', 'click', function (e) {
            e.preventDefault();
            var $elem = $(this);
            $elem = $elem.parent();
            $elem = $elem.parent();
            $elem = $elem.parent();
            console.log('Menu element tagName:', $elem.prop('tagName') + '; class: ' + $elem.attr('class'));
            var $infoButton = $elem.find('.menu-info-button').first();
            console.log('Info button:' + $infoButton);
            UIkit__default.default.toggle($infoButton).toggle(); //.click() did not work
            var modal = UIkit__default.default.modal('#info-modal');
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
                        alert("Tampermonkey script hiba: összetevők címke hiányzik! ");
                        return;
                    }
                    ingredientLabelSpans.each(function () {
                        var currIngredientLabelSpan = $(this);
                        var currIngredientListSpan = currIngredientLabelSpan.next();
                        var currIngredientsString = currIngredientListSpan.text();
                        if (currIngredientsString.length < 20) {
                            alert("Tampermonkey script hiba: összetevők listája hiányzik / túl rövid! ");
                            return;
                        }
                        //console.log(currIngredientsString);
                        ingredientsString += currIngredientsString + '\n\n';
                    });
                    var foundItems = [];
                    let totalBlacklist = uc.blacklist.concat(uc.warnList);
                    totalBlacklist.forEach(function (item) {
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
                    }
                    else {
                        /*if (modal.isToggled()) {
                            modal.hide();
                        }*/
                        $elem.css('color', 'green');
                    }
                }, 1000); //30 ms is too small, 100 is sometimes too small, 300 looks OK but sometimes the UI freezes, 500 sometimes does not find ingredients label, is 1000 enough?
            }, 30);
            return false;
        });
        $(document).keydown(function (event) {
            if (event.which == 49) { // 49 is the keycode for the number 1
                checkAllVisibleFoods(1);
            }
            else if (event.which == 50) { // 50 is the keycode for the number 2
                debugger;
                checkAllVisibleFoods(2);
            }
            else if (event.which == 51) { // 51 is the keycode for the number 3, no purpose at the moment
                checkAllVisibleFoods(3);
            }
        });
        function checkAllVisibleFoods(acceptanceLevel) {
            console.log("Running checkAllVisibleFoods()");
            let $allVisibleFoods = $('.menu-card.uk-card-small');
            //console.log($allVisibleFoods);
            $allVisibleFoods.each(function () {
                let $food = $(this);
                const likeLevel = evaluateCardText($food.text(), uc, acceptanceLevel);
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
    }
    function insertFeedbackText(text) {
        var $mainTable = $('section:contains("Reggeli")').first();
        //var $mainTable = $('table:contains("Reggeli")').first();
        //var $mainTable = $('#etlap');
        const $newDiv = $('<div><br/>' + text + '</div>');
        $newDiv.css({
            'width': '50%',
            'margin-left': 'auto',
            'margin-right': 'auto' // center the div horizontally
        });
        $newDiv.insertBefore($mainTable);
    }
    main();

})(UIkit, $);
