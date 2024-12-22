import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AnimationComparison from "./pages/CSSAnimationPage";
import MainThread from "./pages/MainThread";
import WebWorkerPage from "./pages/WebWorkerPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md p-4">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/main-thread"
                className="text-blue-500 hover:text-blue-700"
              >
                메인 스레드
              </Link>
            </li>
            <li>
              <Link
                to="/web-worker"
                className="text-blue-500 hover:text-blue-700"
              >
                Web Worker
              </Link>
            </li>
            <li>
              <Link
                to="/animation-comparison"
                className="text-blue-500 hover:text-blue-700"
              >
                애니메이션 비교
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/main-thread" element={<MainThread />} />
          <Route path="/web-worker" element={<WebWorkerPage />} />
          <Route
            path="/animation-comparison"
            element={<AnimationComparison />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
