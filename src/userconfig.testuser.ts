import { UserConfig } from './userconfig';

export const TestUserConfig = {
    userNamesToFind: ['Test User - Custom'],
    blacklist: ['mushroom', 'salmon', 'shell', '[^\p{L}]egg[^\p{L}]', 'gomb(a|á)','lazac','kagyló', '[^\p{L}]hal[^\p{L}]'],
    warnList: ['fish', 'egg', 'hal'],
    blacklistExceptions: ['shell pasta', 'fish sauce', 'eggplant', 'kagylótészt(a|á)', 'halszósz'],
    mehList: ['shell pasta', 'fish sauce', 'eggplant', 'tarhonya', 'kelbimbó', 'csirkeszárny'],
    favList1: ['chicken', 'csirk(e|é)'],
    favList2: ['onion', 'hagym(a|á)'],
    testingList: [/*'a'*/],
} as const satisfies UserConfig;
