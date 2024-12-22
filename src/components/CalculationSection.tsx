import React, { useEffect, useRef, useState } from "react";

interface CalculationSectionProps {
  title: string;
  result: number;
  isCalculating: boolean;
  onCalculate: () => void;
}

const CalculationSection: React.FC<CalculationSectionProps> = ({
  title,
  result,
  isCalculating,
  onCalculate,
}) => {
  const animationRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1); // 방향을 저장할 ref 추가
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const animate = () => {
      if (animationRef.current) {
        const currentStyle = animationRef.current.style;
        const currentLeft = parseInt(currentStyle.left || "0", 10);

        // 방향 전환 로직
        if (currentLeft >= 200) {
          directionRef.current = -1;
        } else if (currentLeft <= 0) {
          directionRef.current = 1;
        }

        // 현재 방향에 따라 이동
        currentStyle.left = `${currentLeft + 2 * directionRef.current}px`;
        setTimeout(() => requestAnimationFrame(animate), 20);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {/* JavaScript 기반 애니메이션 요소 */}
      <div className="mb-6 relative h-20">
        <div
          ref={animationRef}
          className="w-16 h-16 bg-blue-500 rounded-full absolute"
          style={{ left: "0px" }}
        />
        <p className="text-sm text-gray-600 absolute top-20">
          ☝️ 이 원이 끊김 없이 움직여야 UI가 blocking되지 않은 것입니다
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={onCalculate}
          disabled={isCalculating}
          className={`px-4 py-2 rounded ${
            isCalculating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isCalculating ? "계산 중..." : "무거운 계산 시작"}
        </button>

        <button
          onClick={() => setClickCount((prev) => prev + 1)}
          className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
        >
          카운트 증가: {clickCount}
        </button>
      </div>

      <div className="mt-4">
        <p className="text-lg">
          결과: <span className="font-mono">{result.toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
};

export default CalculationSection;
