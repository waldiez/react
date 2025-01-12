import { SingleValue } from "@waldiez/components/inputs";
import { WaldiezEdgeData, WaldiezEdgeType } from "@waldiez/models";

export type WaldiezEdgeBasicTabProps = {
    edgeId: string;
    edgeType: WaldiezEdgeType;
    data: WaldiezEdgeData;
    onTypeChange: (
        option: SingleValue<{
            label: string;
            value: WaldiezEdgeType;
        }>,
    ) => void;
    onDataChange: (data: Partial<WaldiezEdgeData>) => void;
};
