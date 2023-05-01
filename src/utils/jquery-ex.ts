import $ from 'jquery';

export function jxItems<T extends HTMLElement>(jq: JQuery<T>) {
  return jq.toArray().map(elem => $(elem));
}
