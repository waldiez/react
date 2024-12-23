import { createdAt, flowId, modelData, modelId, updatedAt } from "./data";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WaldiezNodeModel } from "@waldiez/components";
import { WaldiezProvider } from "@waldiez/store";

const renderModel = (overrides: Partial<typeof modelData> = {}) => {
    const modelDataToUse = { ...modelData, ...overrides };
    const storedModels = [
        {
            id: modelId,
            type: "model",
            data: modelDataToUse,
            position: { x: 0, y: 0 },
        },
    ];
    render(
        <WaldiezProvider
            flowId={flowId}
            storageId="test-storage"
            name="flow name"
            description="flow description"
            requirements={[]}
            tags={[]}
            nodes={storedModels}
            edges={[]}
            createdAt={createdAt}
            updatedAt={updatedAt}
        >
            <WaldiezNodeModel
                id={modelId}
                data={{ ...modelDataToUse, label: modelDataToUse.name }}
                type="model"
                dragging={false}
                zIndex={1}
                isConnectable={true}
                positionAbsoluteX={0}
                positionAbsoluteY={0}
            />
        </WaldiezProvider>,
    );
};
const renderPricesTab = (overrides: Partial<typeof modelData> = {}) => {
    renderModel(overrides);
    const openModalButton = screen.getByTestId(`open-model-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const priceTabButton = screen.getByTestId(`tab-id-model-config-price-${modelId}`);
    fireEvent.click(priceTabButton);
    const priceTab = screen.getByTestId(`panel-model-config-price-${modelId}`);
    expect(priceTab).toBeInTheDocument();
};

describe("WaldiezModelNode Modal Price Tab", () => {
    it("should display the prices tab", () => {
        renderPricesTab();
        const labelElement = screen.getByTestId(`node-label-${modelId}`);
        expect(labelElement).toBeInTheDocument();
    });
    it("should update the prompt price", () => {
        renderPricesTab({
            price: {
                promptPricePer1k: 0.1,
                completionTokenPricePer1k: null,
            },
        });
        const promptPriceInput = screen.getByTestId(
            `model-modal-price-prompt-${modelId}`,
        ) as HTMLInputElement;
        expect(promptPriceInput.value).toBe("0.1");
        fireEvent.change(promptPriceInput, { target: { value: "0.2" } });
        expect(promptPriceInput.value).toBe("0.2");
    });
    it("should handle prompt price < 0", () => {
        renderPricesTab({
            price: {
                promptPricePer1k: 1,
                completionTokenPricePer1k: null,
            },
        });
        const promptPriceInput = screen.getByTestId(
            `model-modal-price-prompt-${modelId}`,
        ) as HTMLInputElement;
        expect(promptPriceInput.value).toBe("1");
        fireEvent.change(promptPriceInput, { target: { value: "-1" } });
        expect(promptPriceInput.value).toBe("-1");
    });
    it("should update the completion price", () => {
        renderPricesTab({
            price: {
                promptPricePer1k: null,
                completionTokenPricePer1k: 0.1,
            },
        });
        const completionPriceInput = screen.getByTestId(
            `model-modal-price-completion-${modelId}`,
        ) as HTMLInputElement;
        expect(completionPriceInput.value).toBe("0.1");
        fireEvent.change(completionPriceInput, { target: { value: "0.2" } });
        expect(completionPriceInput.value).toBe("0.2");
    });
    it("should handle completion price < 0", () => {
        renderPricesTab({
            price: {
                promptPricePer1k: null,
                completionTokenPricePer1k: 1,
            },
        });
        const completionPriceInput = screen.getByTestId(
            `model-modal-price-completion-${modelId}`,
        ) as HTMLInputElement;
        expect(completionPriceInput.value).toBe("1");
        fireEvent.change(completionPriceInput, { target: { value: "-1" } });
        expect(completionPriceInput.value).toBe("-1");
    });
});
