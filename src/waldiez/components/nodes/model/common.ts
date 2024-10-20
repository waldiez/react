import { WaldieModelAPIType } from '@waldiez/models';

export const apiTypeOptions: { label: string; value: WaldieModelAPIType }[] = [
  { label: 'OpenAI', value: 'openai' },
  { label: 'Azure', value: 'azure' },
  { label: 'Gemini', value: 'google' },
  { label: 'Claude', value: 'anthropic' },
  { label: 'Mistral', value: 'mistral' },
  { label: 'Groq', value: 'groq' },
  { label: 'Together', value: 'together' },
  { label: 'NIM', value: 'nim' },
  { label: 'Other', value: 'other' }
];

export const apiKeyEnvs = {
  openai: 'OPENAI_API_KEY',
  azure: 'AZURE_API_KEY',
  google: 'GOOGLE_GEMINI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
  mistral: 'MISTRAL_API_KEY',
  groq: 'GROQ_API_KEY',
  together: 'TOGETHER_API_KEY',
  nim: 'NIM_API_KEY',
  other: 'OPENAI_API_KEY'
};
export const baseUrlsMapping: Record<WaldieModelAPIType, string> = {
  openai: 'https://api.openai.com/v1',
  google: 'https://generativelanguage.googleapis.com/v1beta',
  anthropic: 'https://api.anthropic.com/v1',
  mistral: 'https://api.mistral.ai/v1',
  groq: 'https://api.groq.com/openai/v1',
  together: 'https://api.together.xyz/v1',
  azure: '',
  nim: '',
  other: ''
};
