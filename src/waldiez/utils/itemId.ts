import { nanoid } from 'nanoid';

export const getId = () => {
  // epoch now + nanoid
  return `${Date.now()}${nanoid()}`;
};
