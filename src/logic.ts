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

export function containsLcMatch(list: readonly string[], foodText: string): boolean {
  return getLcMatches(list, foodText).length > 0;
}
 
function getLcMatches(list: readonly string[], foodText: string): readonly string[]{
  return list.filter(listItem1 => lcMatch(foodText, listItem1) );
}
 
function getRelevantExceptionKeywords(exceptionsList: readonly string[], otherKeywordText: string): readonly string[]{
  return exceptionsList.filter(listItem1 => lcMatch(listItem1, otherKeywordText));
}

export function getLcMatchesThatDoNotMatchAnException(list: readonly string[], foodText: string, listExceptions: readonly string[]): readonly string[] {
  return list.filter(oneKeyword => {
    const relevantExceptions = getRelevantExceptionKeywords(listExceptions, oneKeyword);
    return lcMatch(foodText, oneKeyword) && !containsLcMatch(relevantExceptions, foodText);
  });
}

function containsLcMatchThatDoesNotMatchAnException(list: readonly string[], foodText: string, listExceptions: readonly string[]): boolean {
  return getLcMatchesThatDoNotMatchAnException(list, foodText, listExceptions).length > 0;
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
