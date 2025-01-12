import { InfoLabel } from "@waldiez/components/inputs/infoLabel";
import { TextInputProps } from "@waldiez/components/inputs/textInput/types";

export const TextInput = (props: TextInputProps) => {
    const {
        label,
        value,
        onChange,
        onNull = "",
        disabled = false,
        labelInfo = null,
        dataTestId = "text-input",
    } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
            onChange(event);
        }
    };

    return (
        <>
            {labelInfo ? <InfoLabel label={label} info={labelInfo} /> : <label>{label}</label>}
            <input
                placeholder="..."
                type="text"
                value={value !== null ? value : onNull}
                onChange={handleChange}
                disabled={disabled}
                data-testid={dataTestId}
            ></input>
        </>
    );
};
