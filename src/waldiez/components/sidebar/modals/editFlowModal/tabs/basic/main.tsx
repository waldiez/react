import { Select } from '@waldiez/components/inputs';
import { EditFlowModalModalTabBasicProps } from '@waldiez/components/sidebar/modals/editFlowModal/tabs/basic/types';

export const EditFlowModalModalTabBasic = (props: EditFlowModalModalTabBasicProps) => {
  const {
    flowId,
    data,
    remainingEdges,
    sortedEdges,
    selectedNewEdge,
    onDataChange,
    onSelectedNewEdgeChange,
    onAddEdge,
    onRemoveEdge,
    onMoveEdgeUp,
    onMoveEdgeDown
  } = props;
  const { name, description } = data;
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    onDataChange({ name });
  };
  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    onDataChange({ description });
  };
  return (
    <div className="modal-body agent-panel agent-config-panel" id={`rf-${flowId}-edit-flow-modal`}>
      <label htmlFor={`rf-${flowId}-edit-flow-modal-name`}>Name</label>
      <input
        type="text"
        id={`rf-${flowId}-edit-flow-modal-name`}
        placeholder="Flow name"
        value={name}
        onChange={onNameChange}
        data-testid={`edit-flow-${flowId}-name-input`}
      />
      <label htmlFor={`rf-${flowId}-edit-flow-modal-description`}>Description</label>
      <textarea
        id={`rf-${flowId}-edit-flow-modal-description`}
        placeholder="Flow description"
        rows={2}
        value={description}
        onChange={onDescriptionChange}
        data-testid={`edit-flow-${flowId}-description-input`}
      />
      <label>Order</label>
      {sortedEdges.length === 0 ? (
        <div className="info">No chats added to the flow yet.</div>
      ) : (
        <div className="info">
          Specify the chats to run when the flow initializes and their order (if more than one). You should
          remove the ones that are expected to be triggered during the flow (like in nested chats).
        </div>
      )}
      {sortedEdges.map((edge, index) => {
        return (
          <div key={edge.id} className="flow-order-item-wrapper">
            <div className="flow-order-item">
              <span className="flow-order-item-entry">{edge.data?.label as string}</span>
            </div>
            {sortedEdges.length > 1 && (
              <div className="flow-order-item-actions">
                {index > 0 && sortedEdges.length > 1 && (
                  <button
                    type="button"
                    title="Move up"
                    className="flow-order-item-action"
                    data-testid={`move-edge-up-button-${index}`}
                    onClick={onMoveEdgeUp.bind(null, index)}
                  >
                    &#x2191;
                  </button>
                )}
                {index < sortedEdges.length - 1 && (
                  <button
                    title="Move down"
                    type="button"
                    className="flow-order-item-action"
                    data-testid={`move-edge-down-button-${index}`}
                    onClick={onMoveEdgeDown.bind(null, index)}
                  >
                    &#x2193;
                  </button>
                )}
                {sortedEdges.length > 1 && (
                  <button
                    type="button"
                    title="Remove"
                    className="flow-order-item-action"
                    data-testid={`remove-edge-button-${index}`}
                    onClick={onRemoveEdge.bind(null, edge)}
                  >
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
      {remainingEdges.length > 0 && (
        <div className="flow-order-add-wrapper">
          <div className="flex-1 margin-right-10">
            {/* for testing Select by label */}
            <label htmlFor="new-edge-select" className="hidden">
              Add new chat
            </label>
            <Select
              options={remainingEdges.map(edge => ({
                value: edge,
                label: edge.data?.label as string
              }))}
              value={
                selectedNewEdge
                  ? {
                      value: selectedNewEdge,
                      label: selectedNewEdge.data?.label as string
                    }
                  : null
              }
              onChange={onSelectedNewEdgeChange}
              inputId="new-edge-select"
            />
          </div>
          <button
            type="button"
            title="Add chat"
            className="flow-order-add-button"
            disabled={!selectedNewEdge}
            onClick={onAddEdge}
            data-testid="add-edge-to-flow-button"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};
