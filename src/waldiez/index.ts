import { WaldiezProps } from '@waldiez/types';
import { Waldiez } from '@waldiez/waldiez';

export { importFlow } from '@waldiez/store';
export type { WaldiezProps };
// alias, we'll remove 'Waldie' in favor of 'Waldiez'
export type WaldieProps = WaldiezProps;
export { Waldiez };
export const Waldie = Waldiez;
export default Waldiez;
