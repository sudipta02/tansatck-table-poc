import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Poc1 } from "./poc1/main";
import { PocShadcn } from "./poc-shadcn/main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/poc1" element={<Poc1 />} />
        <Route path="/poc-shadcn" element={<PocShadcn />} />
      </Routes>
    </Router>
  );
}

export default App;
