export const modelJson = {
  id: 'test-id',
  type: 'model',
  data: {
    baseUrl: 'http://localhost:3000',
    apiType: 'other',
    apiKey: 'test-api-key',
    apiVersion: 'v1',
    temperature: 0.1,
    topP: 0.2,
    maxTokens: 200,
    defaultHeaders: null,
    price: {
      promptPricePer1k: 0.05,
      completionTokenPricePer1k: 0.1
    }
  },
  name: 'test model',
  description: 'test description',
  tags: [],
  requirements: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  position: {
    x: 0,
    y: 0
  }
};
