import { render, screen } from '@testing-library/react';
import { Waldie } from '@waldiez';
import { describe, expect, it } from 'vitest';

describe('Waldie', () => {
  it('renders a Waldie component', () => {
    render(<Waldie />);
    const agents = screen.getByText(/Agents/i);
    const models = screen.getByText(/Models/i);
    const skills = screen.getByText(/Skills/i);
    expect(agents).toBeInTheDocument();
    expect(models).toBeInTheDocument();
    expect(skills).toBeInTheDocument();
  });
  it('renders error boundary', () => {
    //eslint-disable-next-line
    // @ts-ignore
    render(<Waldie nodes={[{ invalid: 'node' }]} />);
    const errorBoundary = screen.getByTestId('error-boundary');
    expect(errorBoundary).toBeInTheDocument();
  });
});
