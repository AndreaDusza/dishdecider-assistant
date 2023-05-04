import { $ } from '../provided';
import { LikeLevel } from '../userconfig';

export function patchInterfoodStyles() {
  $(".food-etlapsor-style").each(function() {
        $(this).removeAttr("style");
  });
}
