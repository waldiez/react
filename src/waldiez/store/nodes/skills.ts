import { Node, ReactFlowInstance, XYPosition } from '@xyflow/react';

import { nanoid } from 'nanoid';

import {
  WaldieAgentNode,
  WaldieSkillNode,
  WaldieSkillNodeData,
  WaldieSourceSkill,
  WaldieSourceSkillData
} from '@waldiez/models';
import { exportSkill } from '@waldiez/store/exporting';
import { importSkill } from '@waldiez/store/importing';
import { getNewNodePosition, reArrangeNodes, setViewPortTopLeft } from '@waldiez/store/nodes/common';
import { typeOfGet, typeOfSet } from '@waldiez/store/types';

export class SkillsStore {
  static getSkills: (get: typeOfGet) => WaldieSkillNode[] = get => {
    return get().nodes.filter(node => node.type === 'skill') as WaldieSkillNode[];
  };
  static getSkillById: (skillId: string, get: typeOfGet) => WaldieSkillNode | null = (skillId, get) => {
    const skill = get().nodes.find(node => node.id === skillId && node.type === 'skill');
    if (!skill) {
      return null;
    }
    return skill as WaldieSkillNode;
  };
  static addSkill: (get: typeOfGet, set: typeOfSet) => WaldieSkillNode = (get, set) => {
    const existingSkills = get().nodes.filter(node => node.type === 'skill');
    const flowId = get().flowId;
    const rfInstance = get().rfInstance;
    const skillCount = existingSkills.length;
    const position = getNewNodePosition(skillCount, flowId, rfInstance);
    const newNode: WaldieSkillNode = new WaldieSourceSkill(`ws-${nanoid()}`, new WaldieSourceSkillData(), {
      position
    }).asNode();
    set({
      nodes: [
        ...get().nodes,
        {
          ...newNode,
          type: 'skill'
        }
      ],
      updatedAt: new Date().toISOString()
    });
    SkillsStore.reArrangeSkills(get, set);
    setViewPortTopLeft(rfInstance);
    const skillWithNewPosition = get().nodes.find(node => node.id === newNode.id);
    return skillWithNewPosition as WaldieSkillNode;
  };
  static getClonedSkill: (
    skill: WaldieSkillNode,
    rfInstance: ReactFlowInstance | null,
    get: typeOfGet
  ) => WaldieSkillNode = (skill, rfInstance, get) => {
    const skillsCount = get().nodes.filter(node => node.type === 'skill').length;
    const flowId = get().flowId;
    const position = getNewNodePosition(skillsCount, flowId, rfInstance);
    const clonedSkill = new WaldieSourceSkill(`ws-${nanoid()}`, new WaldieSourceSkillData(), {
      position,
      data: { ...skill.data }
    }).asNode();
    return clonedSkill;
  };
  static cloneSkill: (skillId: string, get: typeOfGet, set: typeOfSet) => WaldieSkillNode = (
    skillId,
    get,
    set
  ) => {
    const skill = get().nodes.find(node => node.id === skillId);
    if (!skill) {
      throw new Error(`Skill with id ${skillId} not found`);
    }
    const rfInstance = get().rfInstance;
    const newNode = SkillsStore.getClonedSkill(skill as WaldieSkillNode, rfInstance, get);
    set({
      nodes: [
        ...get().nodes.map(node => {
          if (node.id === skillId) {
            return { ...node, selected: false };
          }
          return node;
        }),
        {
          ...newNode,
          type: 'skill',
          selected: true
        }
      ],
      updatedAt: new Date().toISOString()
    });
    SkillsStore.reArrangeSkills(get, set);
    setViewPortTopLeft(rfInstance);
    const skillWithNewPosition = get().nodes.find(node => node.id === newNode.id);
    return skillWithNewPosition as WaldieSkillNode;
  };
  static updateSkillData: (
    skillId: string,
    data: WaldieSkillNodeData,
    get: typeOfGet,
    set: typeOfSet
  ) => void = (skillId, data, get, set) => {
    const updatedAt = new Date().toISOString();
    set({
      nodes: [
        ...get().nodes.map(node => {
          if (node.type === 'skill' && node.id === skillId) {
            return { ...node, data: { ...data, updatedAt } };
          }
          return node;
        })
      ],
      updatedAt
    });
  };
  static getAgentAfterSkillDeletion = (skillId: string, node: Node) => {
    const agent = node as WaldieAgentNode;
    const skills = agent.data.skills;
    const newSkills = skills.filter(skill => skill.id !== skillId);
    const codeExecution = agent.data.codeExecutionConfig;
    if (typeof codeExecution === 'boolean') {
      return {
        ...agent,
        data: {
          ...agent.data,
          skills: newSkills
        }
      };
    }
    const functions = codeExecution.functions ?? [];
    const newFunctions = functions.filter(func => func !== skillId);
    return {
      ...agent,
      data: {
        ...agent.data,
        skills: newSkills,
        codeExecutionConfig: {
          ...codeExecution,
          functions: newFunctions
        }
      }
    };
  };
  static getAgentsAfterSkillDeletion = (
    get: typeOfGet,
    skillId: string,
    rfInstance: ReactFlowInstance | null
  ) => {
    const newSkillNodes = get().nodes.filter(node => node.type === 'skill' && node.id !== skillId);
    const newSkillNodesCount = newSkillNodes.length;
    const flowId = get().flowId;
    for (let i = 0; i < newSkillNodesCount; i++) {
      const node = newSkillNodes[i];
      const position = getNewNodePosition(i, flowId, rfInstance);
      newSkillNodes[i] = { ...node, position };
    }
    const allNodes = newSkillNodes.concat(get().nodes.filter(node => node.type !== 'skill'));
    // check if the skill is linked to any agent
    const newNodes = [] as Node[];
    allNodes.forEach(node => {
      if (node.type === 'agent') {
        const agent = SkillsStore.getAgentAfterSkillDeletion(skillId, node);
        newNodes.push(agent);
      } else {
        newNodes.push(node);
      }
    });
    return newNodes;
  };
  static deleteSkill: (skillId: string, get: typeOfGet, set: typeOfSet) => void = (skillId, get, set) => {
    const rfInstance = get().rfInstance;
    const allNodes = SkillsStore.getAgentsAfterSkillDeletion(get, skillId, rfInstance);
    set({
      nodes: allNodes,
      updatedAt: new Date().toISOString()
    });
    SkillsStore.reArrangeSkills(get, set);
    setViewPortTopLeft(rfInstance);
  };
  static exportSkill: (skillId: string, get: typeOfGet) => Record<string, unknown> | null = (
    skillId,
    get
  ) => {
    const skill = get().nodes.find(node => node.id === skillId && node.type === 'skill');
    if (!skill) {
      return null;
    }
    return exportSkill(skill as WaldieSkillNode);
  };
  static importSkill: (
    skill: { [key: string]: unknown },
    skillId: string,
    position: XYPosition | undefined
  ) => WaldieSkillNode = (skill, skillId, position) => {
    const newSkill = importSkill(skill, skillId);
    if (position) {
      newSkill.position = position;
    }
    return newSkill;
  };
  static reArrangeSkills = (get: typeOfGet, set: typeOfSet) => {
    const nodes = reArrangeNodes(get().nodes, get().flowId, 'skill', get().rfInstance);
    set({
      nodes,
      updatedAt: new Date().toISOString()
    });
    return nodes;
  };
}
