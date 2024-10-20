// implements IWaldieUserProxyAgent
import { XYPosition } from '@xyflow/react';

import { WaldieSourceUserProxyOrAssistant } from '@waldiez/models/agents/common/userProxyOrAssistant';
import { IWaldieSourceUserProxy, WaldieNodeUserProxy } from '@waldiez/models/types';

export class WaldieSourceUserProxy
  extends WaldieSourceUserProxyOrAssistant
  implements IWaldieSourceUserProxy
{
  asNode(position?: XYPosition): WaldieNodeUserProxy {
    const rootNode = super.asNode(position);
    return {
      ...rootNode,
      data: {
        ...rootNode.data,
        agentType: 'user' as const
      }
    } as WaldieNodeUserProxy;
  }
}
