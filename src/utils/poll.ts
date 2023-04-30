import { sleep } from './sleep';

export async function poll<T>({
  fn,
  interval = 250,
  timeout,
}: {
  fn: (index: number) => T | undefined,
  interval?: number,
  timeout: number,
}) {
  const ending = Date.now() + timeout;
  for (let i = 0;; i++) {
    const result = fn(i);
    if (result !== undefined) {
      return result;
    }
    if (Date.now() >= ending) {
      throw new PollTimeoutError();
    }
    await sleep(interval);
  }
}

export class PollTimeoutError extends Error {}

