import { LikeLevel, UserConfig } from './userconfig';

export type AcceptanceLevel = 1 | 2 | 3;

export function evaluateCardText(
  foodDescription: string,
  userConfig: UserConfig,
  acceptanceLevel: AcceptanceLevel,
): LikeLevel {
  //is blacklisted?
  if (containsLcMatch(userConfig.blacklist, foodDescription) && !containsLcMatch(userConfig.blacklistExceptions, foodDescription)) {
    return LikeLevel.blacklist;
  }

  //warning
  if (containsLcMatch(userConfig.warnList, foodDescription) && !containsLcMatch(userConfig.blacklistExceptions, foodDescription)) {
    return LikeLevel.warn;
  }

  //is meh?
  if (containsLcMatch(userConfig.mehList, foodDescription) && !containsLcMatch(userConfig.blacklistExceptions, foodDescription) ) {
    return LikeLevel.meh;
  }

  //is fav 1 ?
  if (containsLcMatch(userConfig.favList1, foodDescription) && !containsLcMatch(userConfig.favListExceptions, foodDescription)) {
    return LikeLevel.favorite1;
  }

  //is fav2 ?
  if (acceptanceLevel >= 2) {
    if (containsLcMatch(userConfig.favList2, foodDescription)  && !containsLcMatch(userConfig.favListExceptions, foodDescription)) {
      return LikeLevel.favorite2;
    }
  }
  return LikeLevel.neutral;
}


function lcMatch(e1: string, e2: string): boolean {
  return (e1.toLowerCase().match(e2) != null) ||  (e1.toLowerCase().match(e2.toLowerCase()) != null);
}

export function containsLcMatch(list1: readonly string[], foodText: string): boolean {
  for (const listItem1 of list1) {
    if (lcMatch(foodText, listItem1)) {
      //console.log("Found match in containsLcMatch: " + foodObj.text() + " " + listItem1);
      return true;
    }
  }
  return false;
}
/*
export function containsExactMatch(list1: readonly string[], foodText: string): boolean{
  for (const listItem1 of list1) {
    if (lcMatch(foodText, listItem1)) {
      //console.log("Found match in containsLcMatch: " + foodObj.text() + " " + listItem1);
      return true;
    }
  }
  return false;
}*/

export function getMatchingIngredientsWholeName(longText:string, item: string): string[]{
  const regex = new RegExp('\\b[a-záéíóóöőúüű ]*' + item + '[a-záéíóóöőúüű ]*\\b', 'g');
  return longText.toLowerCase().match(regex) ?? [];
}

/*
export function hasExactMatchInText(longText:string, item: string): boolean{
  const regex = new RegExp('\\b' + item + '\\b', 'g');
  return regex.test(longText.toLowerCase());
}
*/