import {
  SpeakerSelectionMode,
  SpeakerTransitionsType,
  WaldieGroupManagerSpeakerSelectionMethodOption,
  WaldieWaldieGroupManagerSpeakers
} from '@waldiez/models/types/';

export class WaldieWaldieGroupManagerSpeakersData {
  data: WaldieWaldieGroupManagerSpeakers;

  constructor(
    selectionMethod: WaldieGroupManagerSpeakerSelectionMethodOption = 'auto',
    selectionCustomMethod: string = '',
    maxRetriesForSelecting: number | null = null,
    selectionMode: SpeakerSelectionMode = 'repeat',
    allowRepeat: boolean | string[] = true,
    allowedOrDisallowedTransitions: { [key: string]: string[] } = {},
    transitionsType: SpeakerTransitionsType = 'allowed'
  ) {
    this.data = {
      selectionMethod,
      selectionCustomMethod,
      maxRetriesForSelecting,
      selectionMode,
      allowRepeat,
      allowedOrDisallowedTransitions,
      transitionsType
    };
  }

  static getSelectionMethod = (
    json: Record<string, unknown>
  ): WaldieGroupManagerSpeakerSelectionMethodOption => {
    let selectionMethod: WaldieGroupManagerSpeakerSelectionMethodOption = 'auto';
    if (
      'selectionMethod' in json &&
      typeof json.selectionMethod === 'string' &&
      ['auto', 'manual', 'random', 'round_robin', 'custom'].includes(json.selectionMethod)
    ) {
      selectionMethod = json.selectionMethod as WaldieGroupManagerSpeakerSelectionMethodOption;
    }
    return selectionMethod;
  };

  static getSelectionCustomMethod = (json: Record<string, unknown>): string => {
    let selectionCustomMethod: string = '';
    if ('selectionCustomMethod' in json && typeof json.selectionCustomMethod === 'string') {
      selectionCustomMethod = json.selectionCustomMethod;
    }
    return selectionCustomMethod;
  };

  static getMaxRetriesForSelecting = (json: Record<string, unknown>): number | null => {
    let maxRetriesForSelecting: number | null = null;
    if ('maxRetriesForSelecting' in json && typeof json.maxRetriesForSelecting === 'number') {
      maxRetriesForSelecting = json.maxRetriesForSelecting;
    }
    return maxRetriesForSelecting;
  };
  static getSelectionMode = (json: Record<string, unknown>): SpeakerSelectionMode => {
    let selectionMode: SpeakerSelectionMode = 'repeat';
    if (
      'selectionMode' in json &&
      typeof json.selectionMode === 'string' &&
      ['repeat', 'transition'].includes(json.selectionMode)
    ) {
      selectionMode = json.selectionMode as SpeakerSelectionMode;
    }
    return selectionMode;
  };
  static getAllowRepeat = (json: Record<string, unknown>): boolean => {
    let allowRepeat: boolean = true;
    if ('allowRepeat' in json && typeof json.allowRepeat === 'boolean') {
      allowRepeat = json.allowRepeat;
    }
    return allowRepeat;
  };
  static getAllowedOrDisallowedTransitions = (json: Record<string, unknown>): { [key: string]: string[] } => {
    let allowedOrDisallowedTransitions: { [key: string]: string[] } = {};
    if (
      'allowedOrDisallowedTransitions' in json &&
      typeof json.allowedOrDisallowedTransitions === 'object' &&
      json.allowedOrDisallowedTransitions
    ) {
      // dist[str, List[str]]
      const transitions: { [key: string]: string[] } = {};
      for (const [key, value] of Object.entries(json.allowedOrDisallowedTransitions)) {
        if (typeof key === 'string' && Array.isArray(value)) {
          transitions[key] = value.filter(v => typeof v === 'string');
        }
      }
      allowedOrDisallowedTransitions = transitions;
    }
    return allowedOrDisallowedTransitions;
  };
  static getTransitionsType = (json: Record<string, unknown>): SpeakerTransitionsType => {
    let transitionsType: SpeakerTransitionsType = 'allowed';
    if (
      'transitionsType' in json &&
      typeof json.transitionsType === 'string' &&
      ['allowed', 'disallowed'].includes(json.transitionsType)
    ) {
      transitionsType = json.transitionsType as SpeakerTransitionsType;
    }
    return transitionsType;
  };

  static fromJSON = (json: any): WaldieWaldieGroupManagerSpeakersData => {
    const speakers: WaldieWaldieGroupManagerSpeakers = {
      selectionMethod: 'auto',
      selectionCustomMethod: '',
      maxRetriesForSelecting: null,
      selectionMode: 'repeat',
      allowRepeat: true,
      allowedOrDisallowedTransitions: {},
      transitionsType: 'allowed'
    };
    if ('speakers' in json && typeof json.speakers === 'object') {
      const speakersData = json.speakers as Record<string, unknown>;
      speakers.selectionMethod = WaldieWaldieGroupManagerSpeakersData.getSelectionMethod(speakersData);
      speakers.selectionCustomMethod =
        WaldieWaldieGroupManagerSpeakersData.getSelectionCustomMethod(speakersData);
      speakers.maxRetriesForSelecting =
        WaldieWaldieGroupManagerSpeakersData.getMaxRetriesForSelecting(speakersData);
      speakers.selectionMode = WaldieWaldieGroupManagerSpeakersData.getSelectionMode(speakersData);
      speakers.allowRepeat = WaldieWaldieGroupManagerSpeakersData.getAllowRepeat(speakersData);
      speakers.allowedOrDisallowedTransitions =
        WaldieWaldieGroupManagerSpeakersData.getAllowedOrDisallowedTransitions(speakersData);
      speakers.transitionsType = WaldieWaldieGroupManagerSpeakersData.getTransitionsType(speakersData);
    }
    return new WaldieWaldieGroupManagerSpeakersData(
      speakers.selectionMethod,
      speakers.selectionCustomMethod,
      speakers.maxRetriesForSelecting,
      speakers.selectionMode,
      speakers.allowRepeat,
      speakers.allowedOrDisallowedTransitions,
      speakers.transitionsType
    );
  };
}
