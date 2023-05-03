import { $ } from '../provided';

export function patchPizzaforteStyles() {
  if ($('#fo-assistant-styles').length === 0) {
    $(document.body).append(`
      <style id="fo-assistant-styles">
        .product {
          border-left: 16px solid #eeeeee;
        }
      </style>
    `);
  }
}
