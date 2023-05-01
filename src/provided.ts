import { poll } from './utils/poll';

export let UIkit: typeof import('uikit').UIkit = (self as any).UIkit;
export let $: typeof import('jquery') = (self as any).$;

export async function waitForJquery() {
  return $ = await poll({
    fn: i => {
      //console.log({
      //  i,
      //  x1: !!(self as any).$,
      //  x2: '$' in self,
      //  x3: self === top,
      //  x4: self === window,
      //  self,
      //});
      return (self as any).$;
    },
    timeout: 3000,
  });
}

export async function waitForUikit() {
  return UIkit = await poll({
    fn: () => (self as any).UIkit,
    timeout: 5000,
  });
}
