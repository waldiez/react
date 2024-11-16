export const getFlowRoot = (flowId: string, fallbackToBody = false) => {
  let rootDiv = document.getElementById(`rf-root-${flowId}`);
  if (!rootDiv && fallbackToBody) {
    // testing? item not inside rf-root
    rootDiv = document.body;
  }
  return rootDiv;
};
