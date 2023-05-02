import { UserConfig } from './userconfig';

export const AndiConfig = {
  userNamesToFind: ['Dusza Andrea'],
  blacklist: [],
  warnList: [],
  blacklistExceptions: [],
  mehList: ['tarhonya'],
  favList1: ['juhtúró', 'camembert', 'grill.{0,10}sajt', 'tápiókapuding', 'rák', 'garnéla', 'lazac', 'miso leves'],
  favList2: ['aszalt paradicsom'],
  testingList: ['vega', 'vegán', 'vegetáriánus', 'akció', 'croissant'],
} as const satisfies UserConfig;
