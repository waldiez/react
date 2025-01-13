import {
    WaldiezSwarmAfterWorkOption,
    WaldiezSwarmAfterWorkRecipientType,
} from "@waldiez/models/Agent/Swarm/types";

export class WaldiezSwarmAfterWork {
    recipientType: WaldiezSwarmAfterWorkRecipientType;
    recipient: string | WaldiezSwarmAfterWorkOption;

    constructor(props: {
        recipientType: WaldiezSwarmAfterWorkRecipientType;
        recipient: string | WaldiezSwarmAfterWorkOption;
    }) {
        this.recipientType = props.recipientType;
        this.recipient = props.recipient;
    }
}
