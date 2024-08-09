import React, { useState, useCallback } from "react";

import JSONEditorReact from "./jsonEditorDemo";

const schema = {
  title: "Example Schema",
  type: "object",
  properties: {
    array: {
      type: "array",
      items: {
        type: "number",
      },
    },
    boolean: {
      type: "boolean",
    },
    number: {
      type: "number",
    },
  },
  required: ["array", "string", "boolean"],
};

const json = {
  array: [1, 2, 3],
  boolean: true,
  null: null,
  number: "four",
  object: { a: "b", c: "d" },
  string: "Hello World",
};

const modes = ["tree", "form", "view", "code", "text"];

const JsonEditorLib = () => {
  const [state, setState] = useState({
    schema,
    text: JSON.stringify(json, null, 2),
    mode: "tree",
  });

  const onChangeText = useCallback((text) => {
    setState((prevState) => ({
      ...prevState,
      text,
    }));
  }, []);

  const onModeChangeSelect = (event) => {
    setState((prevState) => ({
      ...prevState,
      mode: event.target.value,
    }));
  };

  const onModeChange = useCallback((mode) => {
    setState((prevState) => ({
      ...prevState,
      mode,
    }));
  }, []);

  return (
    <div className="app">
      <h1>JSONEditor React advanced demo</h1>
      <div className="contents">
        <div className="mode">
          mode:
          <select value={state.mode} onChange={onModeChangeSelect}>
            {modes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>
        <JSONEditorReact
          schema={state.schema}
          text={state.text}
          mode={state.mode}
          modes={modes}
          indentation={4}
          onChangeText={onChangeText}
          onModeChange={onModeChange}
        />
        <div className="code">
          <pre>
            <code>{state.text}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default JsonEditorLib;
