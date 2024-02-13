import { LikeLevel } from '../userconfig';
import { UnreachableCaseError } from '../utils/unreachable';

export function applyDefaultHighlightToCellStyle($food: JQuery, likeLevel: LikeLevel) {
  myApplyCss($food, getDefaultStyleForLevel(likeLevel));
  $food.addClass('fo-assistant-styled')
}

function myApplyCss(
  $elem: JQuery,
  { children, ...rest }: CssObject,
) {
  $elem.css(rest as Record<string, string>);
  if (children) {
    myApplyCss($elem.children(), children);
  }
}

function getDefaultStyleForLevel(level: LikeLevel): CssObject {
  switch (level) {
    case LikeLevel.blacklist:
      return { 'border-color': '#ff6060', children: { opacity: '0.3' } };
    case LikeLevel.warn:
      return { 'border-color': 'orange' };
    case LikeLevel.neutral:
      return { 'border-color': '#e0e0e0' };
    case LikeLevel.favorite2:
      return { 'border-color': '#cae880' };  
    case LikeLevel.favorite1:
      return { 'border-color': '#60d860' };
    case LikeLevel.meh:
      return { 'border-color': '#9A7B4F' };  
    default:
      throw new UnreachableCaseError(level);
  }
}

type CssObject = {
  children?: CssObject;
} & {
  [key: string]: string | CssObject;
};
