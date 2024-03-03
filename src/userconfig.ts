export type GlobalSettings = {
  readonly version: string;
  readonly selectedProfileId: string;
  readonly profiles: readonly UserConfig[];
};

export type UserConfig = {
  readonly profileId: string;
  readonly profileName: string;
  readonly blacklist: readonly string[];
  readonly blacklistExceptions: readonly string[];
  readonly favListExceptions: readonly string[];
  readonly warnList: readonly string[];
  readonly mehList: readonly string[];
  readonly favList1: readonly string[];
  readonly favList2: readonly string[];
  readonly isRegexEnabled: boolean;
};

export const FruitsRegex = 'gyümölcs|alma|körte|barack|szilva|cseresznye|málna|eper|szamóca|meggy|citrom|narancs|szőlő|'
  + 'dinnye|kivi|banán|ananász|datolya|mangó|szeder|ribizli|áfonya|'
  + 'barack|kaki|mandarin|karambola|kókusz|lime|pomelo|csipkebogyó|gránátalma|füge|'
  + 'galagonya|hurma|kajszi|kumkvat|licsi|mangosztán|maracuja|nektarin|papaya|passiógyümölcs|'
  + 'pitahaya|pitaja|egres';

export const FishSpeciesList = [
    'ponty', 'süllő', 'harcsa', 'tokhal', 'lazac', 'pisztráng', 'tonhal',
    'pangasius', 'tőkehal', 'keszeg', 'szardínia', 'makréla', 'hering', 'hekk', 'sügér',
    'tilápia',
    //'csuka'
];

export const LikeLevel = {
  favorite1: 'favorite1',
  favorite2: 'favorite2',
  neutral: 'neutral',
  meh: 'meh',
  warn: 'warn',
  blacklist: 'blacklist',
} as const;
export type LikeLevel = Values<typeof LikeLevel>;
export type Values<T> = T[keyof T];

