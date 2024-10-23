import type { Node, XYPosition } from '@xyflow/react';

import { IWaldiezSourceNode } from '@waldiez/models/types/base';

export type WaldiezSkillDataCommon = {
  content: string;
  description: string;
  secrets: { [key: string]: string };
  requirements: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type WaldiezSkillNodeData = WaldiezSkillDataCommon & {
  label: string;
};

export type WaldiezSkillNode = Node<WaldiezSkillNodeData, 'skill'>;

export interface IWaldiezSourceSkillData extends WaldiezSkillDataCommon {
  name: string;
}

export interface IWaldiezSourceSkill extends IWaldiezSourceNode {
  data: IWaldiezSourceSkillData;
  asNode: (position?: XYPosition) => WaldiezSkillNode;
}
