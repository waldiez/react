export type WaldiezFlowProps = {
  flowId: string;
  storageId: string;
  monacoVsPath?: string | null;
  inputPrompt?: {
    previousMessages: string[];
    prompt: string;
  } | null;
  onRun?: ((flow: string) => void) | null;
  onChange?: ((content: string) => void) | null;
  onUserInput?: ((userInput: string) => void) | null;
  onUpload?: ((files: File[]) => Promise<string[]>) | null;
};
