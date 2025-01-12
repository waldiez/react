import {
    SpeakerSelectionMode,
    SpeakerTransitionsType,
    WaldiezGroupManagerSpeakerSelectionMethodOption,
    WaldiezGroupManagerSpeakers,
} from "@waldiez/models/types/";

export class WaldiezGroupManagerSpeakersData {
    data: WaldiezGroupManagerSpeakers;

    constructor(
        selectionMethod: WaldiezGroupManagerSpeakerSelectionMethodOption = "auto",
        selectionCustomMethod: string = "",
        maxRetriesForSelecting: number | null = null,
        selectionMode: SpeakerSelectionMode = "repeat",
        allowRepeat: boolean | string[] = true,
        allowedOrDisallowedTransitions: { [key: string]: string[] } = {},
        transitionsType: SpeakerTransitionsType = "allowed",
    ) {
        this.data = {
            selectionMethod,
            selectionCustomMethod,
            maxRetriesForSelecting,
            selectionMode,
            allowRepeat,
            allowedOrDisallowedTransitions,
            transitionsType,
        };
    }

    static getSelectionMethod = (
        json: Record<string, unknown>,
    ): WaldiezGroupManagerSpeakerSelectionMethodOption => {
        let selectionMethod: WaldiezGroupManagerSpeakerSelectionMethodOption = "auto";
        if (
            "selectionMethod" in json &&
            typeof json.selectionMethod === "string" &&
            ["auto", "manual", "random", "round_robin", "custom"].includes(json.selectionMethod)
        ) {
            selectionMethod = json.selectionMethod as WaldiezGroupManagerSpeakerSelectionMethodOption;
        }
        return selectionMethod;
    };

    static getSelectionCustomMethod = (json: Record<string, unknown>): string => {
        let selectionCustomMethod: string = "";
        if ("selectionCustomMethod" in json && typeof json.selectionCustomMethod === "string") {
            selectionCustomMethod = json.selectionCustomMethod;
        }
        return selectionCustomMethod;
    };

    static getMaxRetriesForSelecting = (json: Record<string, unknown>): number | null => {
        let maxRetriesForSelecting: number | null = null;
        if ("maxRetriesForSelecting" in json && typeof json.maxRetriesForSelecting === "number") {
            maxRetriesForSelecting = json.maxRetriesForSelecting;
        }
        return maxRetriesForSelecting;
    };
    static getSelectionMode = (json: Record<string, unknown>): SpeakerSelectionMode => {
        let selectionMode: SpeakerSelectionMode = "repeat";
        if (
            "selectionMode" in json &&
            typeof json.selectionMode === "string" &&
            ["repeat", "transition"].includes(json.selectionMode)
        ) {
            selectionMode = json.selectionMode as SpeakerSelectionMode;
        }
        return selectionMode;
    };
    static getAllowRepeat = (json: Record<string, unknown>): boolean => {
        let allowRepeat: boolean = true;
        if ("allowRepeat" in json && typeof json.allowRepeat === "boolean") {
            allowRepeat = json.allowRepeat;
        }
        return allowRepeat;
    };
    static getAllowedOrDisallowedTransitions = (
        json: Record<string, unknown>,
    ): { [key: string]: string[] } => {
        let allowedOrDisallowedTransitions: { [key: string]: string[] } = {};
        if (
            "allowedOrDisallowedTransitions" in json &&
            typeof json.allowedOrDisallowedTransitions === "object" &&
            json.allowedOrDisallowedTransitions
        ) {
            // dist[str, List[str]]
            const transitions: { [key: string]: string[] } = {};
            for (const [key, value] of Object.entries(json.allowedOrDisallowedTransitions)) {
                if (typeof key === "string" && Array.isArray(value)) {
                    transitions[key] = value.filter(v => typeof v === "string");
                }
            }
            allowedOrDisallowedTransitions = transitions;
        }
        return allowedOrDisallowedTransitions;
    };
    static getTransitionsType = (json: Record<string, unknown>): SpeakerTransitionsType => {
        let transitionsType: SpeakerTransitionsType = "allowed";
        if (
            "transitionsType" in json &&
            typeof json.transitionsType === "string" &&
            ["allowed", "disallowed"].includes(json.transitionsType)
        ) {
            transitionsType = json.transitionsType as SpeakerTransitionsType;
        }
        return transitionsType;
    };

    static fromJSON = (json: any): WaldiezGroupManagerSpeakersData => {
        const speakers: WaldiezGroupManagerSpeakers = {
            selectionMethod: "auto",
            selectionCustomMethod: "",
            maxRetriesForSelecting: null,
            selectionMode: "repeat",
            allowRepeat: true,
            allowedOrDisallowedTransitions: {},
            transitionsType: "allowed",
        };
        if ("speakers" in json && typeof json.speakers === "object") {
            const speakersData = json.speakers as Record<string, unknown>;
            speakers.selectionMethod = WaldiezGroupManagerSpeakersData.getSelectionMethod(speakersData);
            speakers.selectionCustomMethod =
                WaldiezGroupManagerSpeakersData.getSelectionCustomMethod(speakersData);
            speakers.maxRetriesForSelecting =
                WaldiezGroupManagerSpeakersData.getMaxRetriesForSelecting(speakersData);
            speakers.selectionMode = WaldiezGroupManagerSpeakersData.getSelectionMode(speakersData);
            speakers.allowRepeat = WaldiezGroupManagerSpeakersData.getAllowRepeat(speakersData);
            speakers.allowedOrDisallowedTransitions =
                WaldiezGroupManagerSpeakersData.getAllowedOrDisallowedTransitions(speakersData);
            speakers.transitionsType = WaldiezGroupManagerSpeakersData.getTransitionsType(speakersData);
        }
        return new WaldiezGroupManagerSpeakersData(
            speakers.selectionMethod,
            speakers.selectionCustomMethod,
            speakers.maxRetriesForSelecting,
            speakers.selectionMode,
            speakers.allowRepeat,
            speakers.allowedOrDisallowedTransitions,
            speakers.transitionsType,
        );
    };
}
