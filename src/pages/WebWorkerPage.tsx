import { useEffect, useState } from "react";
import CalculationSection from "../components/CalculationSection";

const WebWorkerPage = () => {
  const [result, setResult] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    // Worker 초기화
    const newWorker = new Worker(
      new URL("../workers/fibonacci.worker.ts", import.meta.url),
      { type: "module" }
    );

    // Worker로부터 메시지 수신
    newWorker.onmessage = (e: MessageEvent) => {
      setResult(e.data);
      setIsCalculating(false);
    };

    setWorker(newWorker);

    // 컴포넌트 언마운트시 Worker 정리
    return () => {
      newWorker.terminate();
    };
  }, []);

  const calculateWithWorker = () => {
    if (!worker) return;

    setIsCalculating(true);
    worker.postMessage({ command: "START_CALCULATION" });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Web Worker 계산</h1>
      <CalculationSection
        title="Web Worker로 계산"
        result={result}
        isCalculating={isCalculating}
        onCalculate={calculateWithWorker}
      />
    </div>
  );
};

export default WebWorkerPage;
