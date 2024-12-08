import { render } from '@testing-library/react';

import { InfoLabel } from '@waldiez/components/inputs/infoLabel';

describe('InfoLabel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InfoLabel label="test" info="test" />);
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with function', () => {
    const { baseElement } = render(<InfoLabel label={() => 'test'} info={() => 'test'} />);
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with React.JSX.Element', () => {
    const { baseElement } = render(<InfoLabel label={<div>test</div>} info={<div>test</div>} />);
    expect(baseElement).toBeTruthy();
  });
});
