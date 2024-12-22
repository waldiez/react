import { WizardStepProps } from "@waldiez/components/wizard/types";

export const WizardStep = (props: WizardStepProps) => {
    const { children, id } = props;
    return (
        <div className="wizard-step-view" data-testid={`wizard-step-${id}`}>
            {children}
        </div>
    );
};
