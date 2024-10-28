# Waldiez React

![CI Build](https://github.com/waldiez/react/actions/workflows/main.yaml/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/waldiez/react/badge.svg)](https://coveralls.io/github/waldiez/react) [![npm version](https://badge.fury.io/js/@waldiez%2Freact.svg)](https://badge.fury.io/js/@waldiez%2Freact)

## Requirements

- Node.js
- bun@1.1.33

## Libraries

```json
{
    "@monaco-editor/react": "^4.6.0",
    "@xyflow/react": "^12.3.2",
    "nanoid": "^5.0.8",
    "rc-slider": "^11.1.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-error-boundary": "^4.1.2",
    "react-icons": "^5.3.0",
    "react-select": "^5.8.2",
    "zustand": "^5.0.0"
}
```

## Usage

```tsx
import { Waldiez } from '@waldiez';

import React from 'react';
import ReactDOM from 'react-dom/client';

const isProd = import.meta.env.PROD;

// the actions should be handled by other components
// that use `Waldiez` as a child component

/**
 *OnChange
 */
const onChange = null;
// const onChange = (flowJson: any) => {
//     console.info(JSON.stringify(JSON.parse(flowJson), null, 2));
// };

/**
 * UserInput
 */
// to check/test the user input, use `onUserInput` and `inputPrompt`
// reset `inputPrompt` to `null` to remove/hide the modal
// these two props are used to show a modal to the user
// and get the user input
// Example:
//
// const [ inputPrompt, setInputPrompt ] = useState<{
//   previousMessages: string[];
//   prompt: string;
// } | null>(null);
//
// const onUserInput = (input: string) => {
//   const allMessages = input.split('\n');
//   const previousMessages = allMessages.slice(0, allMessages.length - 1);
//   const prompt = allMessages[allMessages.length - 1];
//   setInputPrompt({ previousMessages, prompt });
// };

// const inputPrompt = {
//   previousMessages: ['Hello, World!', 'How\n are you?'],
//   prompt: 'What is your name?'
// };
// const onUserInput = (input: string) => {
//   console.info(input);
// };
const inputPrompt = null;
const onUserInput = null;

/**
 * OnRun
 * adds a button to the main panel, to run the code.
 * The action should be handled by the parent component
 * "running" the flow happens in the python part / backend
 * the flow string is the JSON stringified flow
 */
const onRunDev = (flowString: string) => {
  console.info(flowString);
};
const onRun = isProd ? null : onRunDev;

/**
 * OnUpload
 * on RAG user: adds a dropzone to upload files
 * when triggered, the files are sent to the backend,
 * returning the paths of the uploaded files
 * and the 'docsPath' in RAG retrieveConfig is updated.
 * the paths can be either relative or absolute,
 * this depends on how we run the flow
 * (the docsPath will have to be updated accordingly if needed on the backend)
 */
const onUploadDev = (files: File[]) => {
  return new Promise<string[]>(resolve => {
    const uploadedFiles: string[] = [];
    const promises = files.map(file => {
      // simulate uploading files
      return new Promise<string>(resolve => {
        setTimeout(() => {
          uploadedFiles.push(`path/to/${file.name}`);
          resolve(`path/to/${file.name}`);
        }, 2000);
      });
    });
    Promise.all(promises).then(() => {
      resolve(uploadedFiles);
    });
  });
};
const onUpload = isProd ? null : onUploadDev;

/**
 * Monaco Editor
 */
// DEV: downloaded in `public/vs` folder (.gitignored)
// PROD:
//  either served and `VITE_VS_PATH` is set to the path, or
//  use the default cdn (jsdelivr) that monaco loader uses
const vsPath = isProd ? (import.meta.env.VS_PATH ?? null) : 'vs';
/**
 * Other props:
 *  we can use:
 * `{ import importFlow } from '@waldiez';`
 *  to import a flow from a waldiez/json file
 *  then we can pass the additional props:
 *    - edges: Edge[];  initial edges to render
 *    - nodes: Node[];  initial nodes to render
 *    - name: string;
 *    - description: string;
 *    - tags: string[];
 *    - requirements: string[];
 *    - createdAt?: string;
 *    - updatedAt?: string;
 */

const startApp = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Waldiez
        monacoVsPath={vsPath}
        onUserInput={onUserInput}
        flowId="flow-0"
        storageId="storage-0"
        inputPrompt={inputPrompt}
        onRun={onRun}
        onChange={onChange}
        onUpload={onUpload}
      />
    </React.StrictMode>
  );
};

startApp();
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/waldiez/react/blob/main/LICENSE) file for details.
