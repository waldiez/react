import { showSnackbar } from '@waldiez/components/snackbar';
import { useWaldiezContext } from '@waldiez/store';

export const useRun = (flowId: string, runner?: ((flow: string) => void) | null) => {
  const getAgents = useWaldiezContext(selector => selector.getAgents);
  const getFlowEdges = useWaldiezContext(selector => selector.getFlowEdges);
  const onFlowChanged = useWaldiezContext(selector => selector.onFlowChanged);
  const canRun = () => {
    const agentsCount = getAgents().length;
    if (agentsCount < 2) {
      const msg = agentsCount === 0 ? 'No agents' : 'Only one agent';
      showSnackbar(flowId, `${msg} found in the flow`, 'error', 3000);
      return false;
    }
    const [orderedEdges, _] = getFlowEdges();
    return orderedEdges.length > 0;
  };
  const onRun = () => {
    if (typeof runner === 'function') {
      if (runner) {
        if (canRun()) {
          const flow = onFlowChanged();
          if (flow) {
            runner(JSON.stringify(flow));
          }
        } else {
          const openEditFlowButtonId = `edit-flow-${flowId}-sidebar-button`;
          const openEditFlowButton = document.getElementById(openEditFlowButtonId);
          if (openEditFlowButton) {
            openEditFlowButton.click();
          }
        }
      }
    }
  };
  return { onRun };
};
