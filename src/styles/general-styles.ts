import { $ } from '../provided';
import { LikeLevel } from '../userconfig';

export function applyBorder(selectorString: string, pxValue: number) {
  const styleId = "fo-assistant-styles-border";
  if ($('#' + styleId).length === 0) {
    $(document.body).append(`
      <style id="${styleId}">
        ${selectorString} {
          border: ${pxValue}px solid #eeeeee;
        }
      </style>
    `);
  }
}

export function applyBorderInDirection(direction:string, selectorString: string, pxValue: number) {
    const styleId = "fo-assistant-styles-border-left";
    if ($('#' + styleId).length === 0) {
      $(document.body).append(`
        <style id="${styleId}">
          ${selectorString} {
            border-${direction}: ${pxValue}px solid #eeeeee;
          }
        </style>
      `);
    }
  }

export function applyOpacity(selectorString: string, likeLevel: LikeLevel, opacityValue: number) {
    const styleId = "fo-assistant-styles-opacity";
    if ($('#' + styleId).length === 0) {
      $(document.body).append(`
        <style id="fo-assistant-styles">
          .fo-assistant-likelevel-${likeLevel} {
            opacity: ${opacityValue};
          }
        </style>
      `);
    }
}

export function applyLikelevelBackgroundColors(selectorString: string) {
    const styleId = "fo-assistant-styles-likelevel-background-colors";
    if ($('#' + styleId).length === 0) {  
      $(document.body).append(`
        <style id="fo-assistant-styles">
            .fo-assistant-likelevel-${LikeLevel.blacklist} {
                background-color: #ff6060;
            }
            .fo-assistant-likelevel-${LikeLevel.warn} {
                background-color: orange;
            }
            .fo-assistant-likelevel-${LikeLevel.neutral} {
                background-color: #e0e0e0;
            }
            .fo-assistant-likelevel-${LikeLevel.favorite2} {
                background-color: #a0e0a0;
            }
            .fo-assistant-likelevel-${LikeLevel.favorite1} {
                background-color: #60d860;
            }
            .fo-assistant-likelevel-${LikeLevel.test} {
                background-color: yellow;
            }
        </style>
      `);
    }
}