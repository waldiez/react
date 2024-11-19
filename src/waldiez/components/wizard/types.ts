import { ReactNode } from 'react';

export type WizardStepProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export type WizardProps = {
  activeStep: number;
  children: ReactNode;
  canGoForward?: boolean | ((step: number) => boolean);
  canGoBack?: boolean | ((step: number) => boolean);
  firstBackTitle?: string;
  lastNextTitle?: string;
  onBack?: (step: number) => void;
  onForward?: (step: number) => void;
};
