const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

self.onmessage = (e: MessageEvent) => {
  if (e.data.command === "START_CALCULATION") {
    let sum = 0;
    // 메인 스레드와 동일한 계산 수행
    for (let i = 0; i < 43; i++) {
      sum += fibonacci(i);
    }
    self.postMessage(sum);
  }
};
