import { UserConfig } from './userconfig';

export const UndefinedUserConfig = {
    userNamesToFind: [""],
    blacklist: [],
    warnList: [],
    blacklistExceptions: [],
    mehList: [],
    favList1: [],
    favList2: [],
    favListExceptions: [],
} as const satisfies UserConfig;
