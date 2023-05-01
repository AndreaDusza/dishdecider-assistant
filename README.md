# Food Order Assistant

A simple Food Order Assistant userscript that can run in a desktop browser extension.<br/>
Based on your preferences, it marks certain foods on the menu as unwanted and highlights the ones that you will probably like.<br/>
Built mainly for Teletal.hu but also supports a few other food delivery services.<br/>
Supported browsers: Chrome. May or may not also work in Firefox, Safari etc...<br/>
Language: Hungarian/English mix.

Recommended steps to use:

1. Install the Tampermonkey extension (or any other userscript manager) in your browser.
2. Go to Tampermonkey's Dashoard. Create a new project.
3. Copy-paste the below file in the code editor.
   * https://github.com/AndreaDusza/teletal-assistant/blob/master/examples/for-tampermonkey.js
3. In the userscript header, the '// @match' lines show which websites are supported.
4. Save the project and make sure that both the project and the userscript manager is enabled. Then go to a supported food order website and check if the userscript is running, by opening Developer Tools and checking the console log. It should print 'Tampermonkey script started...'.
5. In the userscript, take a look at the USER_CONFIGS variable (a sample preference configuration) but do not modify it yet. 
5. Keep scrolling on the website to trigger the Assistant. You should see some items being highlighted as either good or bad - given that they match the sample preferences.
6. If the above works, you can now start customizing USER_CONFIGS.

Example settings:
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

Description of the properties:
 * userNamesToFind: Optional: A list of your usernames that are visible when you are logged in to a food delivery site. Only needed if you use multiple profiles on the same machine with different taste preferences - to differentiate between users. You can have multiple entries in the USER_CONFIGS array. If none of the usernames match, the first entry will be used as the default. If array USER_CONFIGS is missing entirely, then hardcoded test user configs will be used. 
 * blacklist: A food that matches these keyword is an instant NO and will be marked as unwanted on the main page.
 * warnList: Similar to blacklist, but the indication is not as strong as above. Recommended to use with short keywords like 'egg' that could cause too many false positive warnings.
 * blacklistExceptions: For example, to allow 'eggplant' on the main page when 'egg' is blacklisted or warnlisted.
 * mehList: When matched, prevents item from being highlighted as favorite.
 * favList1: Number one favorites, highlighted with the strongest indication.
 * favList2: Secondary favorites, also highlighted but not as strong as the above.
 * testingList: Use for testing purposes.

Regular expressions are supported in all of the above lists.<br/>
Use https://regex101.com/ and https://chat.openai.com/ to understand and create regular expressions.
