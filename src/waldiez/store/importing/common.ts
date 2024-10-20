import { WaldieAgentNodeType } from '@waldiez/models';

export const getNodeMeta = (
  element: any,
  nodeType: 'agent' | 'model' | 'skill',
  agentType?: WaldieAgentNodeType
) => {
  const nodeTypeCapitalized = nodeType.charAt(0).toUpperCase() + nodeType.slice(1);
  let defaultName = nodeTypeCapitalized;
  let defaultDescription = `A new ${nodeTypeCapitalized}`;
  if (nodeType === 'agent' && agentType) {
    defaultName = agentType.charAt(0).toUpperCase() + agentType.slice(1);
    defaultDescription = `A new ${defaultName} Agent`;
  } else if (nodeType === 'skill') {
    defaultName = 'skill_name';
  }
  return getEntryMeta(element, defaultName, defaultDescription);
};
export const getEntryMeta = (
  data: { [key: string]: unknown },
  defaultName: string,
  defaultDescription: string
) => {
  const id = getEntryId(data);
  const name = getEntryName(data, defaultName);
  const description = getEntryDescription(data, defaultDescription);
  const tags = getEntryTags(data);
  const requirements = getEntryRequirements(data);
  const createdAt = getEntryCreatedAt(data);
  const updatedAt = getEntryUpdatedAt(data);
  return { id, name, description, tags, requirements, createdAt, updatedAt };
};
const getEntryId = (data: { [key: string]: unknown }) => {
  let id: string | undefined;
  if ('id' in data && typeof data.id === 'string') {
    id = data.id;
  }
  return id;
};

const getEntryName = (data: { [key: string]: unknown }, defaultName: string) => {
  let name = defaultName;
  if ('name' in data && typeof data.name === 'string') {
    name = data.name;
  }
  return name;
};

const getEntryDescription = (data: { [key: string]: unknown }, defaultDescription: string) => {
  let description = defaultDescription;
  if ('description' in data && typeof data.description === 'string') {
    description = data.description;
  }
  return description;
};

const getEntryTags = (data: { [key: string]: unknown }) => {
  let tags: string[] = [];
  if ('tags' in data && Array.isArray(data.tags)) {
    tags = data.tags.filter((element: any) => typeof element === 'string');
  }
  return tags;
};

const getEntryRequirements = (data: { [key: string]: unknown }) => {
  let requirements: string[] = [];
  if ('requirements' in data && Array.isArray(data.requirements)) {
    requirements = data.requirements.filter((element: any) => typeof element === 'string');
  }
  return requirements;
};

const getEntryCreatedAt = (data: { [key: string]: unknown }) => {
  let createdAt: string = new Date().toISOString();
  if ('createdAt' in data && typeof data.createdAt === 'string') {
    createdAt = data.createdAt;
  }
  return createdAt;
};

const getEntryUpdatedAt = (data: { [key: string]: unknown }) => {
  let updatedAt: string = new Date().toISOString();
  if ('updatedAt' in data && typeof data.updatedAt === 'string') {
    updatedAt = data.updatedAt;
  }
  return updatedAt;
};
