import ReactJson from "@microlink/react-json-view";
import BorderedTreeView from "./treeView";
import { mockJson } from "./data";
import { useState } from "react";

export function JsonEditor() {
  const [data, setData] = useState(mockJson);
  const [tempData, setTempData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEdit = (edit) => {
    setData(edit.updated_src); // Update state with the edited JSON data
  };
  return (
    <>
      <div className="flex justify-end gap-2 mr-2 mt-1">
        <button
          className="bg-red-400 rounded-md text-white p-1"
          onClick={() => setData(JSON.parse(tempData))}
        >
          Save
        </button>
        <button
          className="bg-red-400 rounded-md text-white p-1"
          onClick={() => setIsEditMode(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-400 rounded-md text-white p-1"
          onClick={() => setIsEditMode(false)}
        >
          Cancel
        </button>
      </div>
      <div className="grid grid-cols-2">
        <div className="border p-4">
          <ReactJson src={data} onEdit={handleEdit} theme="monokai" />
        </div>
        <div className="border p-4">
          {isEditMode ? (
            <textarea
              className="w-full h-full max-h-max"
              onChange={(e) => setTempData(e.currentTarget.value)}
            >
              {JSON.stringify(data, null, 2)}
            </textarea>
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      </div>
    </>
  );
}
