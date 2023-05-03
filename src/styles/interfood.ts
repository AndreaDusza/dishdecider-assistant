import { $ } from '../provided';
import { LikeLevel } from '../userconfig';


export function patchInterfoodStyles() {
  $(".food-etlapsor-style").each(function() {
        $(this).removeAttr("style");
  });
  if ($('#fo-assistant-styles').length === 0) {
    $(document.body).append(`
      <style id="fo-assistant-styles">
        .fo-assistant-likelevel-${LikeLevel.blacklist} {
            background-color: #ff6060;
            opacity: 0.3;
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
