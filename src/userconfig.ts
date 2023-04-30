/**
 * blacklist: instant NO
 * warnList: these expressions would match too many items on the main page and hide them unnecessarily
 * blacklistExceptions: to allow 'dhal' when 'hal' is blacklisted (but not 'kardhal'). When adding to item to basket, a warning will appear despite the exception, just to be sure.
 * mehList: when matched, prevents item from being highlighted as potential favorite
 * favList1: absolute best
 * favList2: also good
 */
export type UserConfig = {
  readonly userNameToFind: string;
  readonly blacklist: readonly string[];
  readonly blacklistExceptions: readonly string[];
  readonly testingList: readonly string[];
  readonly warnList: readonly string[];
  readonly mehList: readonly string[];
  readonly favList1: readonly string[];
  readonly favList2: readonly string[];
};

export const FruitsRegex = 'gyümölcs|alma|körte|barack|szilva|cseresznye|málna|eper|meggy|citrom|narancs|szőlő|'
  + 'dinnye|kivi|banán|ananász|datolya|mangó|szeder|ribizli|áfonya|'
  + 'barack|kaki|mandarin|karambola|kókusz|lime|pomelo|csipkebogyó|gránátalma|füge|'
  + 'galagonya|hurma|kajszi|kumkvat|licsi|mangosztán|maracuja|nektarin|papaya|passiógyümölcs|'
  + 'pitahaya|pitaja|egres';

export const LikeLevel = {
  favorite1: 'favorite1',
  favorite2: 'favorite2',
  neutral: 'neutral',
  test: 'test',
  warn: 'warn',
  blacklist: 'blacklist',
} as const;
export type LikeLevel = Values<typeof LikeLevel>;
export type Values<T> = T[keyof T];

