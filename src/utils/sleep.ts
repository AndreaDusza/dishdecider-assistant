export function sleep(delayMs): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delayMs);
  });
}
