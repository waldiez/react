import { useState } from 'react';

import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezNodeModelModalBasicTabProps } from '@waldiez/components/nodes/model/modal/tabs/basic/types';
import { WaldiezNodeModelModalBasicTabView } from '@waldiez/components/nodes/model/modal/tabs/basic/view';
import { WaldiezModelAPIType } from '@waldiez/models';
import { LOGOS } from '@waldiez/theme';

export const WaldiezNodeModelModalBasicTab = (props: WaldiezNodeModelModalBasicTabProps) => {
  const { id, data, onDataChange, onLogoChange } = props;
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ label: e.target.value });
  };
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange({ description: e.target.value });
  };
  const onApiTypeChange = (option: SingleValue<{ label: string; value: WaldiezModelAPIType }>) => {
    if (option) {
      onDataChange({ apiType: option.value });
      onLogoChange(LOGOS[option.value]);
    }
  };
  const onApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ apiKey: e.target.value });
  };
  const onBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ baseUrl: e.target.value });
  };
  const toggleApiKeyVisible = () => {
    setApiKeyVisible(!apiKeyVisible);
  };
  return (
    <WaldiezNodeModelModalBasicTabView
      id={id}
      data={data}
      apiKeyVisible={apiKeyVisible}
      toggleApiKeyVisible={toggleApiKeyVisible}
      onLabelChange={onLabelChange}
      onDescriptionChange={onDescriptionChange}
      onApiTypeChange={onApiTypeChange}
      onApiKeyChange={onApiKeyChange}
      onBaseUrlChange={onBaseUrlChange}
    />
  );
};
