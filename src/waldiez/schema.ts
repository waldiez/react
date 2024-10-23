import {
  WaldiezEdgeData,
  WaldiezModelNodeData,
  WaldiezNodeAssistantData,
  WaldiezNodeGroupManagerData,
  WaldiezNodeRagUserData,
  WaldiezNodeUserProxyData,
  WaldiezSkillNodeData
} from '@waldiez/models/types';

/**
 * Waldiez User Proxy Agent.
 * @param id - The id of the user proxy
 * @param type - The type of the node in a graph (agent)
 * @param agentType - The type of the agent (user)
 * @param name - The name of the agent
 * @param description - The description of the agent
 * @param tags - The tags of the agent
 * @param requirements - The requirements of the agent
 * @param createdAt - The creation date of the agent
 * @param updatedAt - The update date of the agent
 * @param data - The data of the agent. See {@link WaldiezNodeUserProxyData}
 */
export type WaldiezUserProxy = {
  id?: string;
  type: 'agent';
  agentType: 'user';
  name: string;
  description: string;
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  data: Omit<
    WaldiezNodeUserProxyData,
    'label' | 'agentType' | 'description' | 'name' | 'tags' | 'requirements' | 'createdAt' | 'updatedAt'
  >;
};

/**
 * Waldiez Assistant Agent.
 * @param id - The id of the assistant
 * @param type - The type of the node in a graph (agent)
 * @param agentType - The type of the agent (assistant)
 * @param name - The name of the agent
 * @param description - The description of the agent
 * @param tags - The tags of the agent
 * @param requirements - The requirements of the agent
 * @param createdAt - The creation date of the agent
 * @param updatedAt - The update date of the agent
 * @param data - The data of the agent. See {@link WaldiezNodeAssistantData}
 */
export type WaldiezAssistant = {
  id?: string;
  type: 'agent';
  agentType: 'assistant';
  name: string;
  description: string;
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  data: Omit<
    WaldiezNodeAssistantData,
    'label' | 'agentType' | 'description' | 'name' | 'tags' | 'requirements' | 'createdAt' | 'updatedAt'
  >;
};

/**
 * Waldiez Group Chat Manager Agent.
 * @param id - The id of the manager
 * @param type - The type of the node in a graph (agent)
 * @param agentType - The type of the agent (manager)
 * @param name - The name of the agent
 * @param description - The description of the agent
 * @param tags - The tags of the agent
 * @param requirements - The requirements of the agent
 * @param createdAt - The creation date of the agent
 * @param updatedAt - The update date of the agent
 * @param data - The data of the agent. See {@link WaldiezNodeGroupManagerData}
 */
export type WaldiezGroupManager = {
  id?: string;
  type: 'agent';
  agentType: 'manager';
  name: string;
  description: string;
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  data: Omit<
    WaldiezNodeGroupManagerData,
    'label' | 'agentType' | 'description' | 'name' | 'tags' | 'requirements' | 'createdAt' | 'updatedAt'
  >;
};

/**
 * Waldiez RAG User.
 * @param id - The id of the RAG user
 * @param type - The type of the node in a graph (agent)
 * @param agentType - The type of the agent (RAG user)
 * @param name - The name of the user
 * @param description - The description of the user
 * @param tags - The tags of the user
 * @param requirements - The requirements of the user
 * @param createdAt - The creation date of the user
 * @param updatedAt - The update date of the user
 * @param data - The data of the user. See {@link WaldiezNodeRagUserData}
 */
export type WaldiezRagUser = {
  id?: string;
  type: 'agent';
  agentType: 'rag_user';
  name: string;
  description: string;
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  data: Omit<
    WaldiezNodeRagUserData,
    'label' | 'agentType' | 'description' | 'name' | 'tags' | 'requirements' | 'createdAt' | 'updatedAt'
  >;
};

/**
 * Waldiez Model.
 * @param id - The id of the model
 * @param type - The type of the node in a graph (model)
 * @param name - The name of the model
 * @param description - The description of the model
 * @param tags - The tags of the model
 * @param requirements - The requirements of the model
 * @param createdAt - The creation date of the model
 * @param updatedAt - The update date of the model
 * @param data - The data of the model. See {@link WaldiezModelNodeData}
 */
export type WaldiezModel = {
  id?: string;
  type: 'model';
  name: string;
  description: string;
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  data: Omit<
    WaldiezModelNodeData,
    'label' | 'description' | 'name' | 'tags' | 'requirements' | 'createdAt' | 'updatedAt'
  >;
};

/**
 * Waldiez Skill.
 * @param id - The id of the skill
 * @param type - The type of the node in a graph (skill)
 * @param name - The name of the skill
 * @param description - The description of the skill
 * @param tags - The tags of the skill
 * @param requirements - The requirements of the skill
 * @param createdAt - The creation date of the skill
 * @param updatedAt - The update date of the skill
 * @param data - The data of the skill. See {@link WaldiezSkillNodeData}
 */
export type WaldiezSkill = {
  id?: string;
  type: 'skill';
  name: string;
  description: string;
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  data: Omit<
    WaldiezSkillNodeData,
    'label' | 'description' | 'name' | 'tags' | 'requirements' | 'createdAt' | 'updatedAt'
  >;
};

/**
 * Waldiez Chat.
 * @param id - The id of the chat
 * @param data - The data of the chat. See {@link WaldiezEdgeData}
 */
export type WaldiezChat = {
  id?: string;
  data: Omit<WaldiezEdgeData, 'label'> & {
    name: string;
    source: string;
    target: string;
  };
};

/**
 * Waldiez Flow.
 * @param id - The id of the flow
 * @param storageId - The storage id of the flow
 * @param type - The type of the object (flow)
 * @param name - The name of the flow
 * @param description - The description of the flow
 * @param tags - The tags of the flow
 * @param requirements - The requirements of the flow
 * @param data - The data of the flow:
 *  - nodes: The nodes of the flow (UI only).
 *  - edges: The edges of the flow (UI only).
 *  - viewport: The viewport of the flow (UI only).
 *  - agents: The agent nodes of the flow:
 *    - users: The user nodes of the flow. See {@link WaldiezUserProxy}
 *    - assistants: The assistant nodes of the flow. See {@link WaldiezAssistant}
 *    - managers: The manager nodes of the flow. See {@link WaldiezGroupManager}
 * - models: The model nodes of the flow. See {@link WaldiezModel}
 * - skills: The skill nodes of the flow. See {@link WaldiezSkill}
 * - chats: The chats (from edges) of the flow. See {@link WaldiezChat}
 */
export type WaldiezFlow = {
  id?: string;
  storageId?: string;
  type: 'flow';
  name: string;
  description: string;
  tags: string[];
  requirements: string[];
  data: {
    nodes: object[];
    edges: object[];
    viewport?: object;
    agents: {
      users: WaldiezUserProxy[];
      assistants: WaldiezAssistant[];
      managers: WaldiezGroupManager[];
    };
    models: WaldiezModel[];
    skills: WaldiezSkill[];
    chats: WaldiezChat[];
  };
};
