import { WaldiezSkillNodeModalProps } from '@waldiez/components/nodes/skill/modal/types';
import { WaldiezSkillNodeModalView } from '@waldiez/components/nodes/skill/modal/view';

export const WaldiezSkillNodeModal = (props: WaldiezSkillNodeModalProps) => {
  const {
    skillId,
    flowId,
    data,
    isModalOpen,
    darkMode,
    onClose,
    onCancel,
    onSubmit,
    onDataChange,
    onImport,
    onExport
  } = props;
  const onUpdateSecrets = (secrets: { [key: string]: string }) => {
    onDataChange({ secrets });
  };
  const onDeleteSecret = (key: string) => {
    const secrets = { ...data.secrets };
    if (Object.keys(secrets).includes(key)) {
      delete secrets[key];
    }
    onDataChange({ secrets });
  };
  const onAddSecret = (key: string, value: string) => {
    const secrets = { ...data.secrets };
    secrets[key] = value;
    onDataChange({ secrets });
  };
  const onSkillContentChange = (value: string | undefined) => {
    if (value) {
      onDataChange({ content: value });
    }
  };
  const onSkillLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ label: e.target.value });
  };
  const onSkillDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange({ description: e.target.value });
  };
  return (
    <WaldiezSkillNodeModalView
      skillId={skillId}
      flowId={flowId}
      data={data}
      isModalOpen={isModalOpen}
      darkMode={darkMode}
      onClose={onClose}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onSkillLabelChange={onSkillLabelChange}
      onSkillDescriptionChange={onSkillDescriptionChange}
      onSkillContentChange={onSkillContentChange}
      onAddSecret={onAddSecret}
      onUpdateSecrets={onUpdateSecrets}
      onDeleteSecret={onDeleteSecret}
      onImport={onImport}
      onExport={onExport}
    />
  );
};
