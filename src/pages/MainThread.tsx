import { useState } from "react";
import CalculationSection from "../components/CalculationSection";

const MainThread = () => {
  const [result, setResult] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateInMainThread = () => {
    setIsCalculating(true);

    const fibonacci = (n: number): number => {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };

    let sum = 0;
    // 의도적으로 무거운 계산 수행
    for (let i = 0; i < 43; i++) {
      sum += fibonacci(i);
    }

    setResult(sum);
    setIsCalculating(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">메인 스레드 계산</h1>
      <CalculationSection
        title="메인 스레드에서 계산"
        result={result}
        isCalculating={isCalculating}
        onCalculate={calculateInMainThread}
      />
    </div>
  );
};

export default MainThread;
