import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TextInput } from '@waldiez/components/inputs/textInput';

describe('TextInput', () => {
  it('should render successfully', () => {
    const onChange = vi.fn();
    const textInputProps = {
      label: 'test',
      value: 'test',
      onChange
    };
    const { baseElement } = render(<TextInput {...textInputProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with label as JSX.Element', () => {
    const onChange = vi.fn();
    const textInputProps = {
      label: <div>test</div>,
      value: 'test',
      onChange
    };
    const { baseElement } = render(<TextInput {...textInputProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with info', () => {
    const onChange = vi.fn();
    const textInputProps = {
      label: 'test',
      value: 'test',
      onChange,
      labelInfo: 'test'
    };
    const { baseElement } = render(<TextInput {...textInputProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render with info as JSX.Element', () => {
    const onChange = vi.fn();
    const textInputProps = {
      label: 'test',
      value: 'test',
      onChange,
      labelInfo: <div>test</div>
    };
    const { baseElement } = render(<TextInput {...textInputProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should use onNull', () => {
    const onChange = vi.fn();
    const textInputProps = {
      label: 'test',
      value: null,
      onChange,
      onNull: 'test'
    };
    render(<TextInput {...textInputProps} />);
    expect(screen.getByRole('textbox')).toHaveValue('test');
  });

  it('should render with info as JSX.Element', () => {
    const onChange = vi.fn();
    const textInputProps = {
      label: 'test',
      value: 'test',
      onChange,
      labelInfo: <div>test</div>
    };
    const { baseElement } = render(<TextInput {...textInputProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should handle change', () => {
    const onChange = vi.fn();
    const textInputProps = {
      label: 'test',
      value: 'test',
      onChange
    };
    render(<TextInput {...textInputProps} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test2' }
    });
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole('textbox')).toHaveValue('test2');
  });

  it('should not change when disabled', () => {
    const onChange = vi.fn();
    const textInputProps = {
      label: 'test',
      value: 'test',
      onChange,
      disabled: true
    };
    render(<TextInput {...textInputProps} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test2' }
    });
    expect(onChange).not.toHaveBeenCalled();
  });
});
