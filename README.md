# teletal-assistant

A simple Food Order Assistant userscript that can run in a desktop browser extension.<br/>
Mainly for Teletal.hu but also supports a few other food delivery services.<br/>
Supported browsers: Chrome. May or may not also work in Firefox, Safari etc...<br/>
Language: Hungarian/English mix.

Recommended steps to use:

1. Install the Tampermonkey extension (or any other userscript manager) in your browser.
2. Go to Tampermonkey's Dashoard. Create a new project. 
3. Copy-paste two files under each other in the code editor. The first file is the userscript header, the second file is a generated Javascript code file: 
   * https://github.com/AndreaDusza/teletal-assistant/blob/master/examples/tampermonkey-header.js
   * https://github.com/AndreaDusza/teletal-assistant/blob/master/dist/index.js
3. In the userscript header (the first file in the above step), the '// @match' lines show which websites are supported. 
4. Save the project and make sure that both the project and the userscript manager is enabled. Then go to a supported food order website and check if the userscript is running, by opening Developer Tools and checking the console log. 
5. Keep scrolling on the website to trigger the Assistant. You should see some items being highlighted as either good or bad - given that they match the test user's preference settings.
6. Search for the variable TestUserConfig, and edit it based on your preferences.

Example preference settings:
```
export const TestUserEnglishConfig = {
    userNameToFind: 'Test User - English',
    blacklist: ['mushroom', 'salmon', 'shell', '[^\p{L}]egg[^\p{L}]'],
    warnList: ['fish', 'egg'],
    blacklistExceptions: ['shell pasta', 'fish sauce', 'eggplant'],
    mehList: ['brussels sprouts', 'chicken wings'],
    favList1: ['chicken'],
    favList2: ['onion'],
    testingList: [/*'a'*/],
};
```    

Description of the properties:
 * userNameToFind: Only needed if you use multiple profiles on the same machine with different taste preferences - to differentiate between users. As of v0.1, Works only on Teletal.
 * blacklist: A food that matches these keyword is an instant NO and will be marked as unwanted on the main page.
 * warnList: Similar to blacklist, but the indication is not as strong as above. Recommended to use with short keywords like 'egg' that could cause too many false positive warnings.
 * blacklistExceptions: For example, to allow 'eggplant' on the main page when 'egg' is blacklisted or warnlisted.
 * mehList: When matched, prevents item from being highlighted as favorite.
 * favList1: Number one favorites, highlighted with the strongest indication.
 * favList2: Secondary favorites, also highlighted but not as strong as the above. 
 * testingList: Use for testing purposes.

Regular expressions are supported in all of the above lists.<br/>
Use https://regex101.com/ and https://chat.openai.com/ to understand and create regular expressions.
