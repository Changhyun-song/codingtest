"use client";

import { useRef, useCallback, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  problemId: string;
}

export default function CodeEditor({ value, onChange, problemId }: CodeEditorProps) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  useEffect(() => {
    const saved = localStorage.getItem(`code_${problemId}`);
    if (saved && saved !== value) {
      onChange(saved);
    }
  }, [problemId]);

  const handleChange = useCallback(
    (val: string | undefined) => {
      const code = val ?? "";
      onChange(code);
      localStorage.setItem(`code_${problemId}`, code);
    },
    [onChange, problemId]
  );

  return (
    <div className="h-full overflow-hidden rounded-md border border-[#30363d]">
      <Editor
        height="100%"
        language="python"
        theme="vs-dark"
        value={value}
        onChange={handleChange}
        onMount={handleMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: "on",
          padding: { top: 12 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
        }}
        loading={
          <div className="flex h-full items-center justify-center text-[#484f58]">
            Loading editor...
          </div>
        }
      />
    </div>
  );
}
