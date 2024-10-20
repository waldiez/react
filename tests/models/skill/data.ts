export const skillJson = {
  id: 'test-id',
  type: 'skill',
  name: 'test skill',
  description: 'test description',
  tags: [],
  requirements: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  data: {
    content: 'test content',
    secrets: {
      secretKey: 'secretValue'
    }
  },
  position: {
    x: 0,
    y: 0
  }
};
