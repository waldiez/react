import { InfoLabel } from '@waldiez/components/inputs';
import { WaldiezNodeModelModalPriceTabViewProps } from '@waldiez/components/nodes/model/modal/tabs/price/types';

export const WaldiezNodeModelModalPriceTabView = (props: WaldiezNodeModelModalPriceTabViewProps) => {
  const { modelId, data, onPricePromptChange, onPriceCompletionChange } = props;
  const { price } = data;
  return (
    <div className="flex-column">
      <div className="model-price">
        <InfoLabel
          label={'Price:'}
          info={"Price in USD ($). Use 0 if it's free, -1 to skip setting a value"}
        />
        <div className="flex-column margin-left-10 margin-bottom-10 padding-left-10">
          <div className="flex-column">
            <label>Prompt price per 1K tokens:</label>
            <input
              type="number"
              min="-1"
              className="number-max-width"
              value={price?.promptPricePer1k !== null ? price?.promptPricePer1k : -1}
              onChange={onPricePromptChange}
              data-testid={`model-modal-price-prompt-${modelId}`}
            />
          </div>
          <div className="flex-column">
            <label>Completion price per 1K tokens:</label>
            <input
              type="number"
              min="-1"
              className="number-max-width"
              value={price?.completionTokenPricePer1k !== null ? price?.completionTokenPricePer1k : -1}
              onChange={onPriceCompletionChange}
              data-testid={`model-modal-price-completion-${modelId}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
