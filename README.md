# DishDecider Assistant

DishDecider Assistant is a browser extension that helps you decide what food to order.  
When you visit a supported food delivery website, the Assistant marks certain foods on the menu as unwanted and highlights the ones that you will probably like, based on your preferences.  
If you have some programming skills, you can customize your dietary preferences to the extreme.

Supported food delivery services as of 2024 Feb:
  * Wolt.com
  * Teletal.hu
  * Interfood.hu
  * Ordit.hu
  * Pizzaforte.hu
  * Pizzamonkey.hu  

Supported browsers: 
  * Chromium based desktop browsers (Chrome / Edge / Opera / etc...)

## Setup & Run
1. Click the below link to find the DishDecider extension in the Chrome Web Store, and install it:   
https://chromewebstore.google.com/detail/dishdecider/cjecdgchklcnnpkkceeepnlemchglfdd
2. Click 'Manage Extensions' and pin the extension to the toolbar.
3. Click the DishDecider icon on the toolbar and then click 'Dashboard'.  
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/af9c8ba4-91b8-42f5-b663-58435127b8a7)
4. On the Dashboard, enter a few keywords: your most or least favorite foods, ingredients, etc., all in the appropriate section, and save.
5. Now that the setup is ready: Go to a supported food order website, and refresh the page. Keep scrolling to trigger the Assistant. You should see items being highlighted / color coded - given that they match the  keywords that you entered in the previous step. The color coding on the menu matches the colors on the Dashboard.

##  How to fill the 'Food preferences' form?
### In general:
 * Each line is a comma separated list of keywords. A "keyword" means a term that can be multiple words. For example, _chicken wings_ is one keyword.
 * A keyword can be an ingredient (_chicken_), the name of a dish (_tikka masala_), or an adjective (_spicy_). Anything that is in the title, the description or the ingredient list of a menu item.
 * Write keywords in __the language of the food service site__ that you want to order from.   
   (e.g. Use Hungarian for Hungarian sites.)
 
### Line-by-line hints:
 * __Absolute favorites__: do not put too many keywords here. Reserve it for your few top favorites. 
 * __Also liked__: lowered standards go here. 
 * __"Meh" list__: When matched, prevents item from being highlighted as favorite. 
 * __Warn list__: use this line for short keywords like _egg_ that you dislike, but do not want to blacklist, because you worry that it would result in too many falsely blacklisted results (like _eggplant_).
 * __Blacklist__: specific, long keywords go here, if you are confident that these are unwanted.

### Advanced options:
 * __Exceptions from positive keywords__: For example, you may want to prevent highlighting _shell pasta_ on the main page as a favorite when _shell_ is a favorite. This does NOT mean that shell pasta is in any way disliked - it is just not a favorite because it is not shell. Despite the exception, the food item might still be marked as favorite by another valid keyword match. __Example:__ if _shell_ and _tuna_ are your favorites, but _shell pasta_ is an exception, then _Tuna with shell pasta_ will still be marked as favorite.
 * __Exceptions from negative keywords__: If _egg_ is blacklisted  / warnlisted / mehlisted, add _eggplant_ here to indicate that it has nothing to do with eggs.
Also, if you blacklist the term _spicy_, make sure to add _not spicy_ to the exceptions list! Despite the exception, the food item might still be marked as favorite by another valid keyword match. __Example:__ if  _egg_ and _chicken_ are blacklisted, but _eggplant_ is an exception, then _Chicken with eggplant_ will still be blacklisted.
__Be careful__ to only add very specific exceptions. You don't want to suppress a legit warning of a blacklisted keyword by adding an exception keyword that is too broad.
 * Both of the Exceptions lists work in a convoluted way: 
   Each positive/negative keyword from the regular lists is matched against the exception keywords, one by one. The regular keywords and the exception keywords are paired together. This is how the program achieves the correct handling of the above special cases. If you make a mistake and your regular keyword does not match the exception keyword, then the exception will not take effect.

### Potential pitfalls:
 * __Spelling:__ Your spelling has to be 100% correct. If the food service website has typos, you have to spot them and add the misspelled words to your preferences form to match the typos.
 * __Division of words:__ As of 2024 March, the program does not automatically handle division of words. You have to manually add all the variations to your preferences form.
 * __Synonyms:__ The program does NOT know synonyms and does not read your mind. If you write _fish_, that will only mean _fish_. It will NOT mean _trout_, _salmon_, etc.
 * __False matches:__ Try to use specific keywords instead of very short, generic keywords, to avoid the _egg_/_eggplant_ pitfall.  
 * __Optional choices on the menu card:__ Most food service websites offer optional customization choices only when you are adding an item to the basket. In these cases, the program usually works correctly. However, if the website shows the optional choices on the menu card right away, then the program will assume that the food contains all the optional ingredients, even though it doesn't. __Workaround:__ Remove the ingredient from the form, or add it to the exceptions list. If the foods are customizable, then filtering for this ingredient should not be necessary anyway.
 * Do NOT use semicolons (;), quotation marks ("), apostrophes (').
 * It is OK to use dashes (-) and spaces ( ).
 * Try to avoid any other special characters (UNLESS you are familiar with regular expressions and you want to use them).

As mentioned above, regular expressions are supported in all of the above lists.  
Use https://regex101.com/ and https://chat.openai.com/ to understand and create regular expressions. Just do not use any commas in the regular expressions - commas are keyword separators.

For Hungarian users:
 * If you enter keywords ending with 'a' or 'e' ("gomba", "csirke"), they will match the accented version as well ("gombás", "csirkés"). This makes the algorithm look smart, but it is NOT. The algorithm does not reflect any other peculiarity of the Hungarian language. For example, the program does NOT recognize that "halrúd" - "halrudak" should be the same.

## How are the food preferences evaluated?
Each food item on the menu is made up of many words: title, ingredients, description, etc. A food item's text might contain positive and negative keywords as well. The program searches for all the food preference keywords in the food item's text, and determines an overall rating for each food item.
The negative keywords are always stronger than the positive keywords. A food will never be highlighted as a potential favorite if it matches any negative keyword (minding the exceptions).  
A food will be highlighted as an absolute favorite if it matches a keyword from the _Absolute favorites_ list, and does not match any negative keywords (minding the exceptions).  
If a food does not match the _Absolute favorites_ list, it will NOT be marked as an absolute favorite, no matter how many matches it has on the _Also liked_ list.  

## Known bugs / Workarounds
 * If you are not sure that the extension did start running on a page: open Developer Tools and check the console log. It should print something like 'DishDecider Assistant script started...'.
 * If the food delivery page itself is slow, this will cause the Assistant to be slow as well. In case of Interfood.hu, it can take 30 seconds before the script can take effect.
 * If you cannot scroll on the page: press the numeric key '2' to force the evaluation of the food cards.

## Website-specific extra features
 * __Only on Teletal.hu__: If you click on the information button of a menu card, a full list of ingredients and allergens opens. There is also an alternative title for the food item. When you open the popup, the Assistant will perform another check and diplay all the warnlisted and blacklisted items found in the ingredients list and in the alternative title, and display the result at the top of the popup. Just keep in mind that all of this does not happen automatically: you have to open the popup. 

## Want to contribute / add support for a new site?
Steps to be documented.

## Screenshots

### Example preferences (English):
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/7086039a-2272-4225-86ba-5417ce666f9a)

### The Assistant in Action
__Before:__
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/00debb29-51ed-4b59-bb88-ecbdfed8c772)
__After:__
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/baf5d6df-add3-4b44-9767-06dadfb65b01)

## More Screenshots
| Before             |  After |
:-------------------------:|:-------------------------:
![pizzaforte-before](https://user-images.githubusercontent.com/5956233/235608023-ff4bd404-32d4-4b56-a6d6-89e4afabc767.PNG) | ![pizzaforte-after](https://user-images.githubusercontent.com/5956233/235608035-9d7e88dd-e450-4897-a08c-a159190b7e01.PNG)
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/4e549964-3656-4341-be0b-efb7d1f28547) | ![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/22c95fa7-529d-42bc-9015-77f76eb08f93)
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/00debb29-51ed-4b59-bb88-ecbdfed8c772) | ![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/baf5d6df-add3-4b44-9767-06dadfb65b01)
