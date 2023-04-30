import $ from 'jquery';

export function items<T extends HTMLElement>(jq: JQuery<T>) {
  return jq.toArray().map(elem => $(elem));
}
