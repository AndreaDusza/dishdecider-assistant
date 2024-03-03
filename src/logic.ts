import { LikeLevel, UserConfig } from './userconfig';

export type AcceptanceLevel = 1 | 2 | 3;

export function evaluateCardText(
  foodDescription: string,
  userConfig: UserConfig,
  acceptanceLevel: AcceptanceLevel,
): LikeLevel {

  if (containsLcMatchThatDoesNotMatchAnException(userConfig.blacklist, foodDescription, userConfig.blacklistExceptions, userConfig.isRegexEnabled)) {
    return LikeLevel.blacklist;
  }

  if (containsLcMatchThatDoesNotMatchAnException(userConfig.warnList, foodDescription, userConfig.blacklistExceptions, userConfig.isRegexEnabled)) {
    return LikeLevel.warn;
  }

  if (containsLcMatchThatDoesNotMatchAnException(userConfig.mehList, foodDescription, userConfig.blacklistExceptions, userConfig.isRegexEnabled)) {
    return LikeLevel.meh;
  }

  if (containsLcMatchThatDoesNotMatchAnException(userConfig.favList1, foodDescription, userConfig.favListExceptions, userConfig.isRegexEnabled)) {
    return LikeLevel.favorite1;
  }

  if (acceptanceLevel >= 2) {
    if (containsLcMatchThatDoesNotMatchAnException(userConfig.favList2, foodDescription, userConfig.favListExceptions, userConfig.isRegexEnabled)) {
      return LikeLevel.favorite2;
    }
  }
  return LikeLevel.neutral;
}


function lcMatch(e1: string, e2: string, isRegexEnabled: boolean): boolean {
  if (isRegexEnabled){
    return (e1.match(e2) != null) || (e1.toLowerCase().match(e2) != null) || (e1.toLowerCase().match(e2.toLowerCase()) != null);
  } else {
    return e1.includes(e2) || e1.toLowerCase().includes(e2) || e1.toLowerCase().includes(e2.toLowerCase());
  }
}

export function containsLcMatch(list: readonly string[], foodText: string, isRegexEnabled: boolean): boolean {
  return getLcMatches(list, foodText, isRegexEnabled).length > 0;
}
 
function getLcMatches(list: readonly string[], foodText: string, isRegexEnabled: boolean): readonly string[]{
  return list.filter(listItem1 => lcMatch(foodText, listItem1, isRegexEnabled) );
}
 
function getRelevantExceptionKeywords(exceptionsList: readonly string[], otherKeywordText: string, isRegexEnabled: boolean): readonly string[]{
  return exceptionsList.filter(listItem1 => lcMatch(listItem1, otherKeywordText, isRegexEnabled));
}

export function getLcMatchesThatDoNotMatchAnException(list: readonly string[], foodText: string, 
  listExceptions: readonly string[], isRegexEnabled: boolean): readonly string[] {
  return list.filter(oneKeyword => {
    const relevantExceptions = getRelevantExceptionKeywords(listExceptions, oneKeyword, isRegexEnabled);
    return lcMatch(foodText, oneKeyword, isRegexEnabled) && !containsLcMatch(relevantExceptions, foodText, isRegexEnabled);
  });
}

function containsLcMatchThatDoesNotMatchAnException(list: readonly string[], 
  foodText: string, listExceptions: readonly string[], isRegexEnabled: boolean): boolean {
  return getLcMatchesThatDoNotMatchAnException(list, foodText, listExceptions, isRegexEnabled).length > 0;
}

export function getMatchingIngredientsWholeName(longText:string, item: string, includeSpaces: boolean): string[]{
  const lettersSpaces = '[a-záéíóóöőúüű -]*';
  const letters =  '[a-záéíóóöőúüű-]*';
  const r = includeSpaces ? lettersSpaces : letters;
  //const regex = new RegExp('\\b' + r + item + r + '\\b', 'g');
  const regex = new RegExp('([\\s.,()!?]|^)' + r + item + r + '([\\s.,())!?]|$)', 'g');
  const result = longText.toLowerCase().match(regex);
  if (result){
    return result.map(i => i.replace(/(^[,\s()]+)|([,\s()]+$)/g, ''));
  } else {
    return [item];
  } 
}
