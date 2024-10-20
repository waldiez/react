import { IWaldieSourceModelData, WaldieModelAPIType, WaldieModelPrice } from '@waldiez/models/types';

export class WaldieSourceModelData implements IWaldieSourceModelData {
  name: string;
  description: string;
  baseUrl: string | null;
  apiKey: string | null;
  apiType: WaldieModelAPIType;
  apiVersion: string | null;
  temperature: number | null;
  topP: number | null;
  maxTokens: number | null;
  defaultHeaders: { [key: string]: string };
  price: WaldieModelPrice;
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;

  constructor(
    name: string = 'Model',
    description: string = 'Model description',
    baseUrl: string | null = null,
    apiKey: string | null = null,
    apiType: WaldieModelAPIType = 'openai',
    apiVersion: string | null = null,
    temperature: number | null = null,
    topP: number | null = null,
    maxTokens: number | null = null,
    defaultHeaders: { [key: string]: string } = {},
    price: WaldieModelPrice = {
      promptPricePer1k: null,
      completionTokenPricePer1k: null
    },
    tags: string[] = [],
    requirements: string[] = [],
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  ) {
    this.name = name;
    this.description = description;
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.apiType = apiType;
    this.apiVersion = apiVersion;
    this.temperature = temperature;
    this.topP = topP;
    this.maxTokens = maxTokens;
    this.defaultHeaders = defaultHeaders;
    this.price = price;
    this.tags = tags;
    this.requirements = requirements;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON = (
    json: unknown,
    name: string,
    description: string,
    tags: string[],
    requirements: string[],
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString()
  ): IWaldieSourceModelData => {
    if (!json || typeof json !== 'object' || !json) {
      return new WaldieSourceModelData();
    }
    const jsonObject = json as Record<string, unknown>;
    const baseUrl = WaldieSourceModelData.getBaseUrl(jsonObject);
    const apiKey = WaldieSourceModelData.getApiKey(jsonObject);
    const apiType = WaldieSourceModelData.getApiType(jsonObject);
    const apiVersion = WaldieSourceModelData.getApiVersion(jsonObject);
    const temperature = WaldieSourceModelData.getTemperature(jsonObject);
    const topP = WaldieSourceModelData.getTopP(jsonObject);
    const maxTokens = WaldieSourceModelData.getMaxTokens(jsonObject);
    const defaultHeaders = WaldieSourceModelData.getDefaultHeaders(jsonObject);
    const price = WaldieSourceModelData.getPrice(jsonObject);
    return new WaldieSourceModelData(
      name,
      description,
      baseUrl,
      apiKey,
      apiType,
      apiVersion,
      temperature,
      topP,
      maxTokens,
      defaultHeaders,
      price,
      tags,
      requirements,
      createdAt,
      updatedAt
    );
  };
  private static getBaseUrl(json: Record<string, unknown>): string | null {
    let baseUrl: string | null = null;
    if ('baseUrl' in json && typeof json.baseUrl === 'string') {
      baseUrl = json.baseUrl;
    }
    return baseUrl;
  }
  private static getApiKey(json: Record<string, unknown>): string | null {
    let apiKey: string | null = null;
    if ('apiKey' in json && typeof json.apiKey === 'string') {
      apiKey = json.apiKey;
    }
    return apiKey;
  }
  private static getApiType(json: Record<string, unknown>): WaldieModelAPIType {
    let apiType: WaldieModelAPIType = 'openai';
    if (
      'apiType' in json &&
      typeof json.apiType === 'string' &&
      ['openai', 'azure', 'google', 'anthropic', 'mistral', 'groq', 'together', 'nim', 'other'].includes(
        json.apiType
      )
    ) {
      apiType = json.apiType as WaldieModelAPIType;
    }
    return apiType;
  }
  private static getApiVersion(json: Record<string, unknown>): string | null {
    let apiVersion: string | null = null;
    if ('apiVersion' in json && typeof json.apiVersion === 'string') {
      apiVersion = json.apiVersion;
    }
    return apiVersion;
  }
  private static getTemperature(json: Record<string, unknown>): number | null {
    let temperature: number | null = null;
    if ('temperature' in json && typeof json.temperature === 'number') {
      temperature = json.temperature;
    }
    return temperature;
  }
  private static getTopP(json: Record<string, unknown>): number | null {
    let topP: number | null = null;
    if ('topP' in json && typeof json.topP === 'number') {
      topP = json.topP;
    }
    return topP;
  }
  private static getMaxTokens(json: Record<string, unknown>): number | null {
    let maxTokens: number | null = null;
    if ('maxTokens' in json && typeof json.maxTokens === 'number') {
      maxTokens = json.maxTokens;
    }
    return maxTokens;
  }
  private static getDefaultHeaders(json: Record<string, unknown>): {
    [key: string]: string;
  } {
    let defaultHeaders: { [key: string]: string } = {};
    if ('defaultHeaders' in json && typeof json.defaultHeaders === 'object') {
      defaultHeaders = json.defaultHeaders as {
        [key: string]: string;
      };
    }
    return defaultHeaders;
  }
  private static getPrice(json: Record<string, unknown>): WaldieModelPrice {
    const price: WaldieModelPrice = {
      promptPricePer1k: null,
      completionTokenPricePer1k: null
    };
    if ('price' in json && typeof json.price === 'object' && json.price) {
      if ('promptPricePer1k' in json.price && typeof json.price.promptPricePer1k === 'number') {
        price.promptPricePer1k = json.price.promptPricePer1k;
      }
      if (
        'completionTokenPricePer1k' in json.price &&
        typeof json.price.completionTokenPricePer1k === 'number'
      ) {
        price.completionTokenPricePer1k = json.price.completionTokenPricePer1k;
      }
    }
    return price;
  }
}
