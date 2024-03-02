import { LikeLevel, UserConfig } from './userconfig';

export type AcceptanceLevel = 1 | 2 | 3;

export function evaluateCardText(
  foodDescription: string,
  userConfig: UserConfig,
  acceptanceLevel: AcceptanceLevel,
): LikeLevel {

  if (containsLcMatchThatDoesNotMatchAnException(userConfig.blacklist, foodDescription, userConfig.blacklistExceptions)) {
    return LikeLevel.blacklist;
  }

  if (containsLcMatchThatDoesNotMatchAnException(userConfig.warnList, foodDescription, userConfig.blacklistExceptions)) {
    return LikeLevel.warn;
  }

  if (containsLcMatchThatDoesNotMatchAnException(userConfig.mehList, foodDescription, userConfig.blacklistExceptions)) {
    return LikeLevel.meh;
  }

  if (containsLcMatchThatDoesNotMatchAnException(userConfig.favList1, foodDescription, userConfig.favListExceptions)) {
    return LikeLevel.favorite1;
  }

  if (acceptanceLevel >= 2) {
    if (containsLcMatchThatDoesNotMatchAnException(userConfig.favList2, foodDescription, userConfig.favListExceptions)) {
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
      //console.log("Found match: " + foodObj.text() + " " + listItem1);
      return true;
    }
  }
  return false;
}

export function containsLcMatchThatDoesNotMatchAnException(list1: readonly string[], foodText: string, listExceptions: readonly string[]): boolean {
  for (const listItem1 of list1) {
    if (lcMatch(foodText, listItem1) && !(containsLcMatch(listExceptions, foodText) && containsLcMatch(listExceptions, listItem1))) {
      //console.log("Found match: " + foodObj.text() + " " + listItem1);
      return true;
    }
  }
  return false;
}

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