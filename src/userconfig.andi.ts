import { UserConfig } from './userconfig';

export const AndiConfig = {
  userNamesToFind: ['Dusza Andrea'],
  blacklist: [],
  warnList: [],
  blacklistExceptions: [],
  mehList: ['tarhonya'],
  favList1: ['juhtúró', 'camembert', 'grill.{0,10}sajt', 'tápiókapuding', 'garnéla', 'lazac'],
  favList2: ['aszalt paradicsom'],
  testingList: [],
} as const satisfies UserConfig;
