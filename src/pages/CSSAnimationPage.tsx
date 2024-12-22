import { useEffect, useRef, useState } from "react";
import "../styles/animations.css";

const AnimationComparison = () => {
  const jsAnimationRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (jsAnimationRef.current) {
        const currentStyle = jsAnimationRef.current.style;
        const currentLeft = parseInt(currentStyle.left || "0", 10);

        if (currentLeft >= 200) {
          currentStyle.left = "0px";
        } else {
          currentStyle.left = `${currentLeft + 2}px`;
        }

        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const handleHeavyCalculation = () => {
    setIsCalculating(true);

    const fibonacci = (n: number): number => {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };

    // 무거운 계산 수행
    let sum = 0;
    for (let i = 0; i < 42; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sum += fibonacci(i);
    }

    setIsCalculating(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        CSS vs JavaScript 애니메이션 비교
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CSS 애니메이션 섹션 */}
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">CSS 애니메이션</h2>
          <div className="h-40 relative bg-gray-100 rounded overflow-hidden mb-4">
            <div className="css-moving-circle" />
          </div>
          <p className="text-sm text-gray-600">
            CSS 애니메이션은 브라우저의 별도 스레드에서 실행되어 JavaScript의
            무거운 작업에도 영향을 덜 받습니다.
          </p>
        </div>

        {/* JavaScript 애니메이션 섹션 */}
        <div className="p-6 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">JavaScript 애니메이션</h2>
          <div className="h-40 relative bg-gray-100 rounded overflow-hidden mb-4">
            <div
              ref={jsAnimationRef}
              className="w-16 h-16 bg-blue-500 rounded-full absolute"
              style={{ left: "0px", top: "50%" }}
            />
          </div>
          <p className="text-sm text-gray-600">
            JavaScript 애니메이션은 메인 스레드에서 실행되어 무거운 작업 시 끊김
            현상이 발생합니다.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleHeavyCalculation}
          disabled={isCalculating}
          className={`px-6 py-3 rounded-lg ${
            isCalculating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold`}
        >
          {isCalculating ? "계산 중..." : "무거운 계산 시작"}
        </button>
        <p className="mt-2 text-sm text-gray-600">
          버튼을 클릭하면 의도적으로 무거운 계산을 수행하여 각 애니메이션의
          차이를 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default AnimationComparison;
