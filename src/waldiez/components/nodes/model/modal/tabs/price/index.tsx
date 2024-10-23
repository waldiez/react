import { WaldiezNodeModelModalPriceTabProps } from '@waldiez/components/nodes/model/modal/tabs/price/types';
import { WaldiezNodeModelModalPriceTabView } from '@waldiez/components/nodes/model/modal/tabs/price/view';

export const WaldiezNodeModelModalPriceTab = (props: WaldiezNodeModelModalPriceTabProps) => {
  const { modelId, data, onDataChange } = props;
  const onPricePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const parsedValue = parseFloat(e.target.value);
      if (isNaN(parsedValue)) {
        return;
      }
      const completionTokenPricePer1k = data.price?.completionTokenPricePer1k ?? null;
      if (parsedValue >= 0) {
        onDataChange({
          price: {
            completionTokenPricePer1k,
            promptPricePer1k: parsedValue
          }
        });
      } else {
        onDataChange({
          price: { completionTokenPricePer1k, promptPricePer1k: null }
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const onPriceCompletionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const parsedValue = parseFloat(e.target.value);
      if (isNaN(parsedValue)) {
        return;
      }
      const promptPricePer1k = data.price?.promptPricePer1k ?? null;
      if (parsedValue >= 0) {
        onDataChange({
          price: {
            completionTokenPricePer1k: parsedValue,
            promptPricePer1k
          }
        });
      } else {
        onDataChange({
          price: { completionTokenPricePer1k: null, promptPricePer1k }
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <WaldiezNodeModelModalPriceTabView
      modelId={modelId}
      data={data}
      onPricePromptChange={onPricePromptChange}
      onPriceCompletionChange={onPriceCompletionChange}
    />
  );
};
