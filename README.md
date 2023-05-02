# DishDecider Assistant

DishDecider Assistant is a userscript that can run in a desktop browser extension.  
When you visit a supported food delivery website, the Assistant marks certain foods on the menu as unwanted and highlights the ones that you will probably like, based on your preferences.  
If you have some programming skills, you can customize your dietary preferences to the extreme.  
Built mainly for Teletal.hu but also supports a few other food delivery services.  
Supported browsers: Chrome. May or may not also work in Firefox, Safari etc...  
Language: Hungarian/English mix.

## Setup & Run

1. Install the Tampermonkey extension (or any other userscript manager) in your browser.
2. Go to Tampermonkey's Dashboard. Create a new project.
3. Copy-paste the below file in the code editor.
   * https://github.com/AndreaDusza/dishdecider-assistant/blob/master/examples/for-tampermonkey.js
3. In the userscript header, the '// @match' lines show which websites are supported.
4. Save the project and make sure that both the project and the userscript manager is enabled. Then go to a supported food order website and check if the userscript is running, by opening Developer Tools and checking the console log. It should print something like 'DishDecider Assistant script started...'.
5. In the userscript, take a look at the USER_CONFIGS variable (a sample preference configuration) but do not modify it yet. 
5. Keep scrolling on the website to trigger the Assistant (or press key '2'). You should see some items being highlighted as either good or bad - given that they match the sample preferences.
6. If the above works, you can now start customizing USER_CONFIGS.

## Example configs
```
const USER_CONFIGS = [
  {
    userNamesToFind: ['John Henry Doe', 'jdoe_1976@something.com'],
    blacklist: ['mushroom', 'salmon', 'shell', '[^\p{L}]egg[^\p{L}]'],
    warnList: ['fish', 'egg'],
    blacklistExceptions: ['shell pasta', 'fish sauce', 'eggplant'],
    mehList: ['brussels sprout', 'chicken wings'],
    favList1: ['chicken'],
    favList2: ['onion'],
    testingList: [],
  },
  {
    userNamesToFind: ['Mrs. Jane Ursula Doe', 'janeursuladoe@example.com'],
    blacklist: ['chicken', 'pork', 'beef', 'meat'],
    warnList: ['ham'],
    blacklistExceptions: ['hamburger', 'without', 'vegan', 'vegetarian'],
    mehList: [],
    favList1: ['vegan'],
    favList2: ['vegetarian'],
    testingList: [],
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
 * testingList: Use for testing purposes.

Regular expressions are supported in all of the above lists.  
Use https://regex101.com/ and https://chat.openai.com/ to understand and create regular expressions.

## Trying to learn to create a userscript?
There is a simplified version of the Assistant, for learning purposes.  
In case of the "real" assistant script, you can only experiment with the user preferences, but you cannot change the program code. However, in case of the learning sample, you can experiment with the full code however you want.  
You can try changing the sample to support your favorite food delivery site: it might be very easy!
1. Go to Tampermonkey's Dashboard.
2. Disable the "real" assistant script. Otherwise, it would interfere with the learning sample script.
3. Create another new project in Tampermonkey and copy-paste the below file in the code editor.
   * https://raw.githubusercontent.com/AndreaDusza/dishdecider-assistant/master/examples/minimalCode.js

In the learning sample, scrolling does not trigger the Assistant: you have to press key '2'.
   
## Notes
If you get an error saying "$ is not defined" or "$$1 is not defined", try adding the below line to the Tampermonkey script header:  
```
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js  
```
It might fix the issue for the given site but break another site.  
