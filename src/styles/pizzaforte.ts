import $ from 'jquery';

export function patchPizzaforteStyles() {
  if ($('#assistant-pizzaforte-styles').length === 0) {
    $(document.body).append(`
      <style id="assistant-pizzaforte-styles">
        .product {
          border-left: 16px solid #eeeeee;
        }
      </style>
    `);
  }
}
