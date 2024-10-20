import { GroupManagerConfigTabView } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/view/config';
import { GroupManagerSpeakersTabView } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/view/speakers';
import { GroupManagerNodeTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/view/types';
import { TabItem, TabItems } from '@waldiez/components/tabs';

export const GroupManagerNodeTabView = (props: GroupManagerNodeTabViewProps) => {
  const {
    flowId,
    id,
    data,
    allConnectedNodes,
    transitionSource,
    transitionTargets,
    isDarkMode,
    onAddTransition,
    onRemoveTransition,
    onTransitionsTypeChange,
    onTransitionsSourceChange,
    onTransitionsTargetsChange,
    onAdminNameChange,
    onMaxRoundChange,
    onEnableClearHistoryChange,
    onSendIntroductionsChange,
    onMaxRetriesForSelectingChange,
    onAllowRepeatChange,
    onSpeakerRepetitionModeChange,
    onSelectionMethodChange,
    onSelectionCustomMethodChange
  } = props;
  return (
    <div className="agent-panel agent-manager-panel">
      <TabItems activeTabIndex={0}>
        <TabItem id={`wf-${flowId}-agent-groupManager-${id}-config`} label="Config">
          <GroupManagerConfigTabView
            id={id}
            data={data}
            onAdminNameChange={onAdminNameChange}
            onMaxRoundChange={onMaxRoundChange}
            onEnableClearHistoryChange={onEnableClearHistoryChange}
            onSendIntroductionsChange={onSendIntroductionsChange}
            onMaxRetriesForSelectingChange={onMaxRetriesForSelectingChange}
          />
        </TabItem>
        <TabItem id={`wf-${flowId}-agent-groupManager-${id}-speakers`} label="Speakers">
          <GroupManagerSpeakersTabView
            id={id}
            data={data}
            onAddTransition={onAddTransition}
            allConnectedNodes={allConnectedNodes}
            onAllowRepeatChange={onAllowRepeatChange}
            onRemoveTransition={onRemoveTransition}
            onSelectionCustomMethodChange={onSelectionCustomMethodChange}
            onSelectionMethodChange={onSelectionMethodChange}
            onSpeakerRepetitionModeChange={onSpeakerRepetitionModeChange}
            onTransitionsSourceChange={onTransitionsSourceChange}
            onTransitionsTargetsChange={onTransitionsTargetsChange}
            onTransitionsTypeChange={onTransitionsTypeChange}
            transitionSource={transitionSource}
            transitionTargets={transitionTargets}
            isDarkMode={isDarkMode}
          />
        </TabItem>
      </TabItems>
    </div>
  );
};
