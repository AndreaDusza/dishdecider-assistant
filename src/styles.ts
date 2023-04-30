import $ from 'jquery';
import * as jqex from './utils/jquery-ex';

export function ensureStylePatches() {
  const $rows = $('.menu-slider-logged:not(.assistant-styled)');
  for (const $row of jqex.items($rows)) {
    $row.attr('x-original-height', $row.css('height'));
    const originalHeight = $row.height();
    if (originalHeight !== undefined) {
      $row.height(originalHeight + 8);
    }
    $row.addClass('assistant-styled');
  }

  if ($('#assistant-styles').empty()) {
    $(document.body).append(`
    <style id="assistant-styles">
      .menu-slider-logged {
        margin-bottom: 0;
      }
      .menu section > div .menu-cell-text.menu-cell-text {
        border: none;
      }
      .menu-card {
        border: 6px solid #eeeeee;
        box-sizing: border-box;
      }

    </style>
  `);
  }
}
