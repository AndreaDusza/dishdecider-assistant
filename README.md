# DishDecider Assistant

DishDecider Assistant is a browser extension userscript that helps you decide what food to order.  
When you visit a supported food delivery website, the Assistant marks certain foods on the menu as unwanted and highlights the ones that you will probably like, based on your preferences.  
If you have some programming skills, you can customize your dietary preferences to the extreme.

Supported food delivery services as of 2023 May:
  * Wolt.com
  * Teletal.hu
  * Interfood.hu
  * Ordit.hu
  * Pizzaforte.hu  

Supported browsers: Chrome. May or may not also work in Firefox, Safari etc...  Desktop browsers only.

Language: English / Hungarian.

## Screenshots
__Before:__
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/00debb29-51ed-4b59-bb88-ecbdfed8c772)
__After:__
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/baf5d6df-add3-4b44-9767-06dadfb65b01)
__Dashboard:__
![Food Prefs](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/70252e8a-0d10-4b85-be15-06bc49df5d4c)

## Setup & Run

1. Install the Tampermonkey extension (or any other userscript manager) in your browser.   
https://www.tampermonkey.net/  
(This is a general utility, created by Jan Biniok.)
2. Go to Tampermonkey's Dashboard. Create a new project.
3. Copy-paste the below userscript file in the code editor.  
https://github.com/AndreaDusza/dishdecider-assistant/blob/master/examples/for-tampermonkey.js
3. In the userscript header, the '// @match' lines show which websites are supported.
4. In the userscript, take a look at the USER_CONFIGS variable (a sample preference configuration) but do not modify it yet. 
5. Save the project and make sure that both the project and the userscript manager itself is enabled. Then go to a supported food order website, and refresh the page. Keep scrolling to trigger the Assistant (or press key '2'). You should see some items being highlighted as either good or bad - given that they match the sample preferences.
6. If the above does not work, look at the 'Known bugs / Workarounds' section in this doc and try to fix. When there are no more issues, you can start customizing USER_CONFIGS.

## Example configs
```
const USER_CONFIGS = [
  {
    userNamesToFind: ['John Henry Doe', 'jdoe_1976@something.com'],
    blacklist: ['mushroom', 'salmon', 'shell', '[^a-z]egg[^a-z]'],
    warnList: ['fish', 'egg'],
    blacklistExceptions: ['shell pasta', 'fish sauce', 'eggplant'],
    mehList: ['brussels sprout', 'chicken wings'],
    favList1: ['chicken'],
    favList2: ['onion'],
    favListExceptions: [],
  },
  {
    userNamesToFind: ['Mrs. Jane Ursula Doe', 'janeursuladoe@example.com'],
    blacklist: ['chicken', 'pork', 'beef', 'meat'],
    warnList: ['ham'],
    blacklistExceptions: ['hamburger', 'without', 'vegan', 'vegetarian'],
    mehList: [],
    favList1: ['vegan'],
    favList2: ['vegetarian'],
    favListExceptions: [],
  }
];
```

## Description of the config properties
 * userNamesToFind: Optional: A list of your usernames that are visible when you are logged in to a food delivery site. Only needed if you use multiple profiles on the same machine with different taste preferences - to differentiate between users. You can have multiple entries in the USER_CONFIGS array. If none of the usernames match, the first entry will be used as the default. If array USER_CONFIGS is missing entirely, then hardcoded test user configs will be used. 
 * blacklist: A food that matches these keyword is an instant NO and will be marked as unwanted on the main page.
 * warnList: Similar to blacklist, but the indication is not as strong as above. Recommended to use with short keywords like 'egg' that could cause too many false positive warnings.
 * blacklistExceptions: For example, to allow 'eggplant' on the main page when 'egg' is blacklisted or warnlisted.
 * mehList: When matched, prevents item from being highlighted as favorite.
 * favList1: Number one favorites, highlighted with the strongest indication.
 * favList2: Secondary favorites, also highlighted but not as strong as the above.
 * favListExceptions: For example, to prevent highlighting 'shell pasta' on the main page as a favorite when 'shell' is a favorite.

Regular expressions are supported in all of the above lists.  
Use https://regex101.com/ and https://chat.openai.com/ to understand and create regular expressions.

## Trying to learn to create a userscript?
There is a simplified version of the Assistant, for learning purposes.  
In case of the "real" assistant script, you can only experiment with the user preferences in Tampermonkey, but you cannot change the program code. However, in case of the learning sample, you can experiment with the full code however you want.  
You can try changing the sample to support your favorite food delivery site: it might be very easy!
1. Go to Tampermonkey's Dashboard.
2. Disable the "real" assistant script. Otherwise, it would interfere with the learning sample script.
3. Create another new project in Tampermonkey and copy-paste the below file in the code editor.  
https://github.com/AndreaDusza/dishdecider-assistant/blob/master/examples/minimalCode.js

In the learning sample, scrolling does not trigger the Assistant: you have to press key '2'.
   
## Known bugs / Workarounds

 * As of 2023 May on Ordit.hu and Wolt.com: If you get an error saying "$ is not defined" or "$$1 is not defined", try adding the below line to the Tampermonkey script header:  
```
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js  
```
It can fix the issue for the given site but might break another site.  

 * If you get an error due to the the raw Github URL being not available (because of a proxy), try replacing with alternative URL:   
https://tokeletesosszhang.hu/dishdecider/index.js

 * Best way to confirm that the usercript did start running on the page: open Developer Tools and check the console log. It should print something like 'DishDecider Assistant script started...'.
 * If the food delivery page itself is slow, this will cause the Assistant to be slow as well. In case of Interfood.hu, it can take 30 seconds before the script can take effect. 

## More Screenshots
| Before             |  After |
:-------------------------:|:-------------------------:
![pizzaforte-before](https://user-images.githubusercontent.com/5956233/235608023-ff4bd404-32d4-4b56-a6d6-89e4afabc767.PNG) | ![pizzaforte-after](https://user-images.githubusercontent.com/5956233/235608035-9d7e88dd-e450-4897-a08c-a159190b7e01.PNG)
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/4e549964-3656-4341-be0b-efb7d1f28547) | ![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/22c95fa7-529d-42bc-9015-77f76eb08f93)
![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/00debb29-51ed-4b59-bb88-ecbdfed8c772) | ![image](https://github.com/AndreaDusza/dishdecider-assistant/assets/5956233/baf5d6df-add3-4b44-9767-06dadfb65b01)
