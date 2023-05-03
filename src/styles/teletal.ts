import { $ } from '../provided';
import { jxItems } from '../utils/jquery-ex';

export function patchTeletalStyles() {
  const $newRows = $(
    '.menu-slider:not([x-original-height]), ' +
    '.menu-slider-logged:not([x-original-height])'
  );
  for (const $row of jxItems($newRows)) {
    $row.attr('x-original-height', $row.css('height') ?? '');
    $row.css('height', '');
  }

  const $newCells = $('.menu-card:not(.fo-assistant-styled)');
  for (const $cell of jxItems($newCells)) {
    jxItems($cell.children('> .menu-cell-text')).forEach((text, i) => {
      text.css('flex', i === 0 ? '1 1 auto' : '');
    });
    $cell.addClass('.fo-assistant-styled');
  }


  if ($('#fo-assistant-styles').length === 0) {
    $(document.body).append(`
      <style id="fo-assistant-styles">
        .menu-slider-logged, .menu-slider {
          margin-bottom: 0;
          height: unset;
          display: flex;
          flex-flow: row nowrap;
        }
        .menu .menu-card.menu-card.menu-card.fo-assistant-styled {
          border-style: solid;
        }
        .menu .menu-card.menu-card.menu-card {
          /* artificially increase specificity by duplicating the same class over enough times */
          border: 2px dashed #a0a020;
          border-bottom: 6px dashed #a0a020;
          /* border-radius: 6px; */
          box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.4) inset;
          box-sizing: border-box;
          height: unset;
          display: flex;
          flex-flow: column nowrap;
        }
        .menu .menu-cell-text.menu-cell-text.menu-cell-text.menu-cell-text.menu-cell-text {
          /* artificially increase specificity by duplicating the same class over enough times */
          border: none;
          height: unset;
        }
        .menu .menu-cell-text.menu-cell-text.menu-cell-text.menu-cell-text.menu-cell-spinner {
          /* artificially increase specificity by duplicating the same class over enough times */
          background: none;
        }
        .menu-card > .menu-cell-text.menu-cell-text-description {
          flex: 1 1 auto;
        }
      </style>
    `);
  }
}
