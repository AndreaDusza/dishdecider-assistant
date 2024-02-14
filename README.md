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
  * Chromium based desktop browsers, such as:
    * Chrome / Chromium
    * Edge
    * Opera 

Language:
  * The user interface language is English.
  * The food / ingredient keywords can be in any language. Tested with English and Hungarian.

## Screenshots
__Before:__
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/00debb29-51ed-4b59-bb88-ecbdfed8c772)
__After:__
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/baf5d6df-add3-4b44-9767-06dadfb65b01)

## Setup & Run
1. Click the below link to find the DishDecider extension in the Chrome Web Store, and install it:   
https://chromewebstore.google.com/detail/dishdecider/cjecdgchklcnnpkkceeepnlemchglfdd
2. Click 'Manage Extensions' and pin the extension to the toolbar.
3. Click the DishDecider icon on the toolbar and then click 'Dashboard'.  
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/af9c8ba4-91b8-42f5-b663-58435127b8a7)
4. On the Dashboard, enter a few keywords: your most or least favorite foods, ingredients, etc., all in the appropriate section, and save.
5. Now that the setup is ready: Go to a supported food order website, and refresh the page. Keep scrolling to trigger the Assistant. You should see items being highlighted / color coded - given that they match the  keywords that you entered in the previous step. The color coding on the menu matches the colors on the Dashboard.

## Dashboard
### Example preferences (English):
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/f21d3b86-b98a-4bbb-b99a-5b3d9c7b5b4e)

###  How to fill the 'Food preferences' form?
In general:
 * Each line is a comma separated list of keywords. A "keyword" means a term that can be multiple words. For example, _chicken wings_ is one keyword.
 * A keyword can be an ingredient (_chicken_), the name of a dish (_tikka masala_), or an adjective (_spicy_). Anything that is in the title, the description or the ingredient list of a menu item.
 * Write keywords in __the language of the food service site__ that you want to order from.   
   (e.g. Use Hungarian for Hungarian sites.)
 
Line-by-line hints:
 * __Absolute favorites__: do not put too many keywords here. Reserve it for your few top favorites. 
 * __Also liked__: lowered standards go here. 
 * __"Meh" list__: When matched, prevents item from being highlighted as favorite. 
 * __Warn list__: use this line for short keywords like _egg_ that you dislike, but do not want to blacklist, because it would result in too many falsely blacklisted results (like _eggplant_).
 * __Blacklist__: specific, long keywords go here, if you are confident that these are unwanted.

Advanced options:
 * __Exceptions from favorites__: For example, you may want to prevent highlighting _shell pasta_ on the main page as a favorite when _shell_ is a favorite. This does NOT mean that shell pasta is in any way disliked - it is just not a favorite because it is not shell. The food item might still be highlighted as a favorite if there is another legit reason that makes it a favorite.
 * __Exceptions from warn list and blacklist__: If _egg_ is blacklisted or warnlisted, add _eggplant_ here to indicate that it has nothing to do with eggs.
Also, if you blacklist the term _spicy_, make sure to add _not spicy_ to the exceptions list!

Potential pitfalls:
 * Do NOT use semicolons (;), quotation marks ("), apostrophes (').
 * It is OK to use dashes (-) and spaces ( ).
 * Try to avoid any other special characters (UNLESS you are familiar with regular expressions and you want to use them).
 * Try to use specific keywords instead of very short, generic keywords, to avoid the _egg_/_eggplant_ pitfall.  

As mentioned above, regular expressions are supported in all of the above lists.  
Use https://regex101.com/ and https://chat.openai.com/ to understand and create regular expressions. Just do not use any commas in the regular expressions - commas are keyword separators.

For Hungarian users:
 * If you enter keywords ending with 'a' or 'e' ("gomba", "csirke"), they will match the accented version as well ("gombás", "csirkés"). This makes the algorithm look smart, but it is NOT. The algorithm does not reflect any other peculiarity of the Hungarian language. For example, the program does NOT recognize that "halrúd" - "halrudak" should be the same.

## How are the food preferences evaluated?
Each food item on the menu is made up of many words: title, ingredients, description, etc. A food item's text might contain positive and negative keywords as well. The program searches for all the food preference keywords in the food item's text, and determines an overall rating for each food item.
The negative keywords are always stronger than the positive keywords. A food will never be highlighted as a potential favorite if it matches any negative keyword (minding the exceptions).  

## Known bugs / Workarounds
 * If you are not sure that the usercript did start running on a page: open Developer Tools and check the console log. It should print something like 'DishDecider Assistant script started...'.
 * If the food delivery page itself is slow, this will cause the Assistant to be slow as well. In case of Interfood.hu, it can take 30 seconds before the script can take effect.
 * If you cannot scroll on the page: press the numeric key '2' to force the evaluation of the food cards.

## Want to contribute / add support for a new site?
Steps to be documented.

## More Screenshots
| Before             |  After |
:-------------------------:|:-------------------------:
![pizzaforte-before](https://user-images.githubusercontent.com/5956233/235608023-ff4bd404-32d4-4b56-a6d6-89e4afabc767.PNG) | ![pizzaforte-after](https://user-images.githubusercontent.com/5956233/235608035-9d7e88dd-e450-4897-a08c-a159190b7e01.PNG)
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/4e549964-3656-4341-be0b-efb7d1f28547) | ![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/22c95fa7-529d-42bc-9015-77f76eb08f93)
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/00debb29-51ed-4b59-bb88-ecbdfed8c772) | ![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/baf5d6df-add3-4b44-9767-06dadfb65b01)
