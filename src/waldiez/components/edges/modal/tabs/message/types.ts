import { WaldiezEdgeData } from '@waldiez/models';

export type WaldiezEdgeMessageTabProps = {
  edgeId: string;
  data: WaldiezEdgeData;
  darkMode: boolean;
  skipRagOption: boolean;
  onDataChange: (data: Partial<WaldiezEdgeData>) => void;
};
