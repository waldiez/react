import type { Node, XYPosition } from '@xyflow/react';

import { IWaldieSourceNode } from '@waldiez/models/types/base';

export type WaldieSkillDataCommon = {
  content: string;
  description: string;
  secrets: { [key: string]: string };
  requirements: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type WaldieSkillNodeData = WaldieSkillDataCommon & {
  label: string;
};

export type WaldieSkillNode = Node<WaldieSkillNodeData, 'skill'>;

export interface IWaldieSourceSkillData extends WaldieSkillDataCommon {
  name: string;
}

export interface IWaldieSourceSkill extends IWaldieSourceNode {
  data: IWaldieSourceSkillData;
  asNode: (position?: XYPosition) => WaldieSkillNode;
}
