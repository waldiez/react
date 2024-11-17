//MonacoEditor with standard options
import { Editor as MonacoEditor } from '@monaco-editor/react';

import { EditorProps } from '@waldiez/components/inputs/editor/types';

export const Editor = (props: EditorProps) => {
  const { value, onChange, darkMode } = props;
  const theme = darkMode ? 'vs-dark' : 'vs-light';
  return (
    <div className="code-editor">
      <MonacoEditor
        defaultLanguage="python"
        theme={theme}
        value={value}
        className={theme}
        options={{
          wordWrap: 'on',
          automaticLayout: true,
          fontSize: 16,
          formatOnType: true,
          autoClosingBrackets: 'always',
          tabSize: 4,
          minimap: { scale: 1 }
        }}
        onChange={onChange}
      />
    </div>
  );
};