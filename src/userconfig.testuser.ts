import { UserConfig } from './userconfig';

export const TestUserConfig = {
    userNamesToFind: ['Hardcoded Default Test User'],
    blacklist: ['mushroom', 'salmon', 'shell', 'gomb(a|á)','lazac','kagyló'],
    warnList: ['fish', 'egg', 'hal'],
    blacklistExceptions: ['shell pasta', 'fish sauce', 'eggplant', 'kagylótészt(a|á)', 'halszósz'],
    mehList: ['shell pasta', 'fish sauce', 'eggplant', 'tarhonya', 'kelbimbó', 'csirkeszárny'],
    favList1: ['chicken', 'csirk(e|é)'],
    favList2: ['onion', 'hagym(a|á)'],
    testingList: [/*'a'*/],
} as const satisfies UserConfig;
