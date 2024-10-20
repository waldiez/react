import { SingleValue } from '@waldiez/components/inputs';
import { WaldieNodeModelModalBasicTabProps } from '@waldiez/components/nodes/model/modal/tabs/basic/types';
import { WaldieNodeModelModalBasicTabView } from '@waldiez/components/nodes/model/modal/tabs/basic/view';
import { WaldieModelAPIType } from '@waldiez/models';
import { LOGOS } from '@waldiez/theme';

export const WaldieNodeModelModalBasicTab = (props: WaldieNodeModelModalBasicTabProps) => {
  const { data, onDataChange, onLogoChange } = props;
  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ label: e.target.value });
  };
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange({ description: e.target.value });
  };
  const onApiTypeChange = (option: SingleValue<{ label: string; value: WaldieModelAPIType }>) => {
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
  return (
    <WaldieNodeModelModalBasicTabView
      data={data}
      onLabelChange={onLabelChange}
      onDescriptionChange={onDescriptionChange}
      onApiTypeChange={onApiTypeChange}
      onApiKeyChange={onApiKeyChange}
      onBaseUrlChange={onBaseUrlChange}
    />
  );
};
