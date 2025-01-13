import { nanoid } from "nanoid";

export const getId = () => {
    return `${Date.now()}${nanoid()}`;
};
