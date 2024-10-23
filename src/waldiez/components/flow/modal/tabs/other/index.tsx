import { WaldiezFlowModalOtherTabProps } from '@waldiez/components/flow/modal/tabs/other/types';
import { WaldiezFlowModalOtherTabView } from '@waldiez/components/flow/modal/tabs/other/view';

export const WaldiezFlowModalOtherTab = (props: WaldiezFlowModalOtherTabProps) => {
  const { data, onDataChange } = props;
  const { tags, requirements } = data;
  const onAddTag = (tag: string) => {
    onDataChange({ tags: [...tags, tag] });
  };
  const onDeleteTag = (tag: string) => {
    onDataChange({ tags: tags.filter(t => t !== tag) });
  };
  const onTagChange = (oldValue: string, newValue: string) => {
    onDataChange({ tags: tags.map(t => (t === oldValue ? newValue : t)) });
  };
  const onAddRequirement = (requirement: string) => {
    onDataChange({ requirements: [...requirements, requirement] });
  };
  const onDeleteRequirement = (requirement: string) => {
    onDataChange({
      requirements: requirements.filter(r => r !== requirement)
    });
  };
  const onRequirementChange = (oldValue: string, newValue: string) => {
    onDataChange({
      requirements: requirements.map(r => (r === oldValue ? newValue : r))
    });
  };
  return (
    <WaldiezFlowModalOtherTabView
      tags={tags}
      requirements={requirements}
      onAddTag={onAddTag}
      onDeleteTag={onDeleteTag}
      onTagChange={onTagChange}
      onAddRequirement={onAddRequirement}
      onDeleteRequirement={onDeleteRequirement}
      onRequirementChange={onRequirementChange}
    />
  );
};
