import { XYPosition } from '@xyflow/react';

import { WaldiezSourceUserProxyOrAssistant } from '@waldiez/models/agents/common/userProxyOrAssistant';
import { IWaldiezSourceAssistant, WaldiezNodeAssistant } from '@waldiez/models/types';

export class WaldiezSourceAssistant
  extends WaldiezSourceUserProxyOrAssistant
  implements IWaldiezSourceAssistant
{
  asNode: (position?: XYPosition) => WaldiezNodeAssistant = position => {
    const rootNode = super.asNode(position);
    return {
      ...rootNode,
      type: 'agent',
      data: {
        ...rootNode.data,
        agentType: 'assistant' as const
      }
    } as WaldiezNodeAssistant;
  };
}
