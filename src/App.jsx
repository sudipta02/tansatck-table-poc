import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Poc1 } from "./poc1/main";
import TaskPage from "./poc-shadcn/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tansatck-table-poc" element={<TaskPage />}>
          {/* <Route path="poc1" element={<Poc1 />} /> */}
          {/* <Route path="poc-shadcn" element={<TaskPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
