import $ from 'jquery';

export function jxItems<T extends HTMLElement>(jq: JQuery<T>) {
  return jq.toArray().map(elem => $(elem));
}

export function jxNthParent($elem: JQuery, n: number) {
  for (let i = 0; i < n; i++) {
    $elem = $elem.parent();
  }
  return $elem;
}
