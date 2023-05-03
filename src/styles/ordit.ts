import { $ } from '../provided';

export function patchOrditStyles() {
  if ($('#fo-assistant-styles').length === 0) {
    $(document.body).append(`
      <style id="fo-assistant-styles">
        .food-card {
          border: 5px solid #eeeeee;
        }
      </style>
    `);
  }
}
