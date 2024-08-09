import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Poc1 } from "./poc1/main";
import TaskPage, { Test } from "./poc-shadcn/page";
import { JsonEditor } from "./json-editor-poc";
import JsonEditorLib from "./jsoneditor-lib";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tansatck-table-poc">
          <Route path="" element={<TaskPage />} />
          <Route path="test" element={<Test />} />
          <Route path="json-editor" element={<JsonEditor />} />
          <Route path="json-editor-lib" element={<JsonEditorLib />} />
          {/* <Route path="poc1" element={<Poc1 />} /> */}
          {/* <Route path="poc-shadcn" element={<TaskPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
