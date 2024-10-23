// implements IWaldiezUserProxyAgent
import { XYPosition } from '@xyflow/react';

import { WaldiezSourceUserProxyOrAssistant } from '@waldiez/models/agents/common/userProxyOrAssistant';
import { IWaldiezSourceUserProxy, WaldiezNodeUserProxy } from '@waldiez/models/types';

export class WaldiezSourceUserProxy
  extends WaldiezSourceUserProxyOrAssistant
  implements IWaldiezSourceUserProxy
{
  asNode(position?: XYPosition): WaldiezNodeUserProxy {
    const rootNode = super.asNode(position);
    return {
      ...rootNode,
      data: {
        ...rootNode.data,
        agentType: 'user' as const
      }
    } as WaldiezNodeUserProxy;
  }
}
