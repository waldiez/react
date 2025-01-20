import { InfoLabel } from "@waldiez/components/infoLabel";
import { TextInputProps } from "@waldiez/components/textInput/types";

export const TextInput = (props: TextInputProps) => {
    const {
        label,
        value,
        onChange,
        onNull = "",
        disabled = false,
        labelInfo = null,
        dataTestId = "text-input",
        placeholder = "...",
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
                placeholder={placeholder}
                type="text"
                value={value !== null ? value : onNull}
                onChange={handleChange}
                disabled={disabled}
                data-testid={dataTestId}
            ></input>
        </>
    );
};
