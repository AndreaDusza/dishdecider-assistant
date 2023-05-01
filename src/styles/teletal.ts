import { $ } from '../provided';
import { jxItems } from '../utils/jquery-ex';

export function patchTeletalStyles() {
  const $newRows = $('.menu-slider-logged:not([x-original-height])');
  for (const $row of jxItems($newRows)) {
    $row.attr('x-original-height', $row.css('height') ?? '');
    $row.css('height', '');
  }

  const $newCells = $('.menu-card:not(.assistant-styled)');
  for (const $cell of jxItems($newCells)) {
    jxItems($cell.children('> .menu-cell-text')).forEach((text, i) => {
      text.css('flex', i === 0 ? '1 1 auto' : '');
    });
    $cell.addClass('.assistant-styled');
  }


  if ($('#assistant-teletal-styles').length === 0) {
    $(document.body).append(`
      <style id="assistant-teletal-styles">
        .menu-slider-logged, .menu-slider {
          margin-bottom: 0;
          height: unset;
          display: flex;
          flex-flow: row nowrap;
        }
        /* artificially increase specificity by duplicating the same class over enough times */
        .menu .menu-card.menu-card.menu-card {
          border: 6px solid #eeeeee;
          border-radius: 8px;
          box-sizing: border-box;
          height: unset;
          display: flex;
          flex-flow: column nowrap;
        }
        .menu .menu-cell-text.menu-cell-text.menu-cell-text {
          border: none;
          height: unset;
        }
        .menu-card > .menu-cell-text.menu-cell-text-description {
          flex: 1 1 auto;
        }
      </style>
    `);
  }
}
