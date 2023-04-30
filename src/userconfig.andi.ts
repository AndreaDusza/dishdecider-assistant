import { UserConfig } from "./userconfig";

export const AndiConfig = {
    userNameToFind: "Dusza Andrea",
    blacklist: [],
    warnList: [],
    blacklistExceptions: [],
    mehList: ['tarhonya'],
    favList1: ['juhtúró', 'camembert', 'grillezett sajt', 'grill sajt', 'tápiókapuding', 'rák', 'lazac'],
    favList2: ['aszalt paradicsom'],
    testingList: [],
} as const satisfies UserConfig;