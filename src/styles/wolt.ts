import { $ } from '../provided';

export function patchWoltStyles() {
  if ($('#fo-assistant-styles').length === 0) {
    $(document.body).append(`
      <style id="fo-assistant-styles">
        [data-test-id="horizontal-item-card"] {
          border: 5px solid #eeeeee;
        }
      </style>
    `);
  }
}
