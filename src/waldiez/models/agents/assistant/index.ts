import { XYPosition } from '@xyflow/react';

import { WaldieSourceUserProxyOrAssistant } from '@waldiez/models/agents/common/userProxyOrAssistant';
import { IWaldieSourceAssistant, WaldieNodeAssistant } from '@waldiez/models/types';

export class WaldieSourceAssistant
  extends WaldieSourceUserProxyOrAssistant
  implements IWaldieSourceAssistant
{
  asNode: (position?: XYPosition) => WaldieNodeAssistant = position => {
    const rootNode = super.asNode(position);
    return {
      ...rootNode,
      type: 'agent',
      data: {
        ...rootNode.data,
        agentType: 'assistant' as const
      }
    } as WaldieNodeAssistant;
  };
}
