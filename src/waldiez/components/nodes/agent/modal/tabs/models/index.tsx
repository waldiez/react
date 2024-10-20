import { useEffect } from 'react';

import { MultiValue } from '@waldiez/components/inputs';
import { ModelsAgentConfigTabProps } from '@waldiez/components/nodes/agent/modal/tabs/models/types';
import { ModelsAgentConfigTabView } from '@waldiez/components/nodes/agent/modal/tabs/models/view';

export const ModelsAgentConfigTab = (props: ModelsAgentConfigTabProps) => {
  const { id, data, models, onDataChange } = props;
  useEffect(() => {
    // if a model is removed, but previously linked to the agent,
    // remove it from the agent data
    const modelIds = models.map(model => model.id);
    const newModelIds = data.modelIds.filter(id => modelIds.includes(id));
    if (newModelIds.length !== data.modelIds.length) {
      // updateAgentData({ modelIds: newModelIds }, true);
      // setModelIds(newModelIds);
      onDataChange({ modelIds: newModelIds }, true);
    }
  }, [data.modelIds]);
  const onModelsChange = (options: MultiValue<{ label: string; value: string }>) => {
    if (options) {
      const modelIds = options.map(model => model.value);
      onDataChange({ modelIds });
    }
  };
  return <ModelsAgentConfigTabView id={id} models={models} data={data} onModelsChange={onModelsChange} />;
};
