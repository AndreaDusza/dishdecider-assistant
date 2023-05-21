import { UserConfig } from './userconfig';

export const AndiConfig = {
  userNamesToFind: ['Dusza Andrea'],
  blacklist: [],
  warnList: [],
  blacklistExceptions: [],
  mehList: ['tarhonya'],
  favList1: ['juhtúró', 'gombafej', 'tápiókapuding', 'rák', 'garnéla', 'lazac', 'miso leves'],
  favList2: ['aszalt paradicsom', 'camembert', 'négysajt', 'grill.{0,10}sajt', 'sajt.{0,5}töltött', 'sajtkrém', 'avokádó', 'kukoric(a|á)'],
  testingList: ['vega', 'vegán', 'vegetáriánus', 'akció', 'croissant'],
} as const satisfies UserConfig;
