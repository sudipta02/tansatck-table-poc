import React, { useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";

import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

const JSONEditorReact = (props) => {
  const containerRef = useRef(null);
  const jsoneditorRef = useRef(null);
  const schemaRef = useRef(cloneDeep(props.schema));
  const schemaRefsRef = useRef(cloneDeep(props.schemaRefs));

  useEffect(() => {
    const options = { ...props };
    delete options.json;
    delete options.text;

    jsoneditorRef.current = new JSONEditor(containerRef.current, options);

    if ("json" in props) {
      jsoneditorRef.current.set(props.json);
    }
    if ("text" in props) {
      jsoneditorRef.current.setText(props.text);
    }

    return () => {
      if (jsoneditorRef.current) {
        jsoneditorRef.current.destroy();
      }
    };
  }, [props]);

  useEffect(() => {
    if ("json" in props) {
      jsoneditorRef.current.update(props.json);
    }

    if ("text" in props) {
      jsoneditorRef.current.updateText(props.text);
    }

    if ("mode" in props) {
      jsoneditorRef.current.setMode(props.mode);
    }

    const schemaChanged = !isEqual(props.schema, schemaRef.current);
    const schemaRefsChanged = !isEqual(props.schemaRefs, schemaRefsRef.current);
    if (schemaChanged || schemaRefsChanged) {
      schemaRef.current = cloneDeep(props.schema);
      schemaRefsRef.current = cloneDeep(props.schemaRefs);
      jsoneditorRef.current.setSchema(props.schema, props.schemaRefs);
    }
  }, [props]);

  return <div className="jsoneditor-react-container" ref={containerRef} />;
};

export default JSONEditorReact;
