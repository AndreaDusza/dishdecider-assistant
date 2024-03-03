import { UserConfig } from './userconfig';

export const UndefinedUserConfig = {
    profileId: '0',
    profileName: "",
    blacklist: [],
    warnList: [],
    blacklistExceptions: [],
    mehList: [],
    favList1: [],
    favList2: [],
    favListExceptions: [],
    isRegexEnabled: false,
} as const satisfies UserConfig;
