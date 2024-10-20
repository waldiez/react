import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import selectEvent from 'react-select-event';

import { MessageInput } from '@waldiez/components/inputs/messageInput';
import { WaldieMessage } from '@waldiez/models';

const onTypeChange = vi.fn();
const onMessageChange = vi.fn();
const messageInputProps = {
  current: {
    type: 'none',
    use_carryover: false,
    content: '',
    context: {}
  } as WaldieMessage,
  defaultContent: 'test',
  darkMode: false,
  selectLabel: 'test',
  selectTestId: 'test',
  onTypeChange,
  onMessageChange,
  includeContext: false,
  skipCarryoverOption: true,
  skipRagOption: true
};
const messageInputWithStringType = {
  ...messageInputProps,
  current: {
    type: 'string',
    use_carryover: false,
    content: '',
    context: {}
  } as WaldieMessage
};

beforeEach(() => {
  onTypeChange.mockClear();
  onMessageChange.mockClear();
});

describe('MessageInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageInput {...messageInputProps} />);
    expect(baseElement).toBeTruthy();
  });
  it('should render with not none label', () => {
    const customMessageInputProps = {
      ...messageInputWithStringType,
      notNoneLabel: 'test'
    };
    const { baseElement } = render(<MessageInput {...customMessageInputProps} />);
    expect(baseElement).toBeTruthy();
  });
  it('should render with not none label info', () => {
    const customMessageInputProps = {
      ...messageInputWithStringType,
      notNoneLabelInfo: 'test'
    };
    const { baseElement } = render(<MessageInput {...customMessageInputProps} />);
    expect(baseElement).toBeTruthy();
  });
  it('should handle type change', async () => {
    render(<MessageInput {...messageInputProps} />);
    const select = screen.getByRole('combobox');
    selectEvent.openMenu(select);
    await selectEvent.select(select, 'Text');
    expect(onTypeChange).toHaveBeenCalledWith('string');
  });
  it('should handle type change to none', async () => {
    render(<MessageInput {...messageInputWithStringType} />);
    const select = screen.getByRole('combobox');
    selectEvent.openMenu(select);
    await selectEvent.select(select, 'None');
    expect(onTypeChange).toHaveBeenCalledWith('none');
  });
  it('should handle message change', () => {
    render(<MessageInput {...messageInputWithStringType} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test update' }
    });
    expect(onMessageChange).toHaveBeenCalledWith({
      type: 'string',
      content: 'test update',
      use_carryover: false,
      context: {}
    });
  });
});
it('should render with null string content', () => {
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'string',
      use_carryover: false,
      content: null,
      context: {}
    } as WaldieMessage
  };
  const { baseElement } = render(<MessageInput {...customMessageInputProps} />);
  expect(baseElement).toBeTruthy();
});
it('should render with null method content', () => {
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'method',
      use_carryover: false,
      content: null,
      context: {}
    } as WaldieMessage
  };
  const { baseElement } = render(<MessageInput {...customMessageInputProps} />);
  expect(baseElement).toBeTruthy();
});
it('should handle method message change', async () => {
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'method',
      use_carryover: false,
      content: '',
      context: {}
    } as WaldieMessage
  };
  render(<MessageInput {...customMessageInputProps} />);
  const editor = await screen.findByRole('textbox');
  expect(editor).toBeInTheDocument();
  fireEvent.change(editor, { target: { value: 'test update' } });
  expect(onMessageChange).toHaveBeenCalledWith({
    type: 'method',
    use_carryover: false,
    content: 'test update',
    context: {}
  });
});
it('should include context', () => {
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'string',
      use_carryover: false,
      content: '',
      context: {
        key1: 'value1'
      }
    } as WaldieMessage
  };
  const { baseElement } = render(<MessageInput {...customMessageInputProps} />);
  expect(baseElement).toBeTruthy();
});
it('should add a context entry', () => {
  const addContextEntry = vi.fn();
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'string',
      use_carryover: false,
      content: '',
      context: {
        key1: 'value1'
      }
    } as WaldieMessage,
    onAddContextEntry: addContextEntry,
    includeContext: true
  };
  render(<MessageInput {...customMessageInputProps} />);
  const addEntryInput = screen.getByTestId('new-dict-message-context-key');
  fireEvent.change(addEntryInput, { target: { value: 'key2' } });
  const addValueInput = screen.getByTestId('new-dict-message-context-value');
  fireEvent.change(addValueInput, { target: { value: 'value2' } });
  const addButton = screen.getByTestId('add-new-dict-message-context-item');
  fireEvent.click(addButton);
  expect(addContextEntry).toHaveBeenCalledWith('key2', 'value2');
});
it('should remove a context entry', () => {
  const removeContextEntry = vi.fn();
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'string',
      use_carryover: false,
      content: '',
      context: {
        key1: 'value1'
      }
    } as WaldieMessage,
    onRemoveContextEntry: removeContextEntry,
    includeContext: true
  };
  render(<MessageInput {...customMessageInputProps} />);
  const deleteButton = screen.getByTestId('delete-dict-item-message-context-0');
  fireEvent.click(deleteButton);
  expect(removeContextEntry).toHaveBeenCalledWith('key1');
});
it('should update context entries', () => {
  const updateContextEntries = vi.fn();
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'string',
      use_carryover: false,
      content: '',
      context: {
        key1: 'value1'
      }
    } as WaldieMessage,
    onUpdateContextEntries: updateContextEntries,
    includeContext: true
  };
  render(<MessageInput {...customMessageInputProps} />);
  const keyInput = screen.getByTestId('key-input-message-context-0');
  fireEvent.change(keyInput, { target: { value: 'key2' } });
  const saveButton = screen.getByTestId('save-dict-item-message-context-0');
  fireEvent.click(saveButton);
  expect(updateContextEntries).toHaveBeenCalledWith({ key2: 'value1' });
});
it('should include rag option', () => {
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'string',
      use_carryover: false,
      content: '',
      context: {}
    } as WaldieMessage,
    skipRagOption: false
  };
  const { baseElement } = render(<MessageInput {...customMessageInputProps} />);
  expect(baseElement).toBeTruthy();
  const select = screen.getByRole('combobox');
  selectEvent.openMenu(select);
  expect(screen.getByText('Use RAG Message Generator')).toBeInTheDocument();
});
it('should skip rag option', () => {
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'string',
      use_carryover: false,
      content: '',
      context: {}
    } as WaldieMessage,
    skipRagOption: true
  };
  const { baseElement } = render(<MessageInput {...customMessageInputProps} />);
  expect(baseElement).toBeTruthy();
  const select = screen.getByRole('combobox');
  selectEvent.openMenu(select);
  expect(screen.queryByText('Use RAG Message Generator')).not.toBeInTheDocument();
});
it('should display and update the rag input', () => {
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'rag_message_generator',
      use_carryover: false,
      content: '',
      context: {
        key1: 'value1'
      }
    } as WaldieMessage,
    skipRagOption: false
  };
  const { baseElement } = render(<MessageInput {...customMessageInputProps} />);
  expect(baseElement).toBeTruthy();
  const problemTextarea = screen.getByTestId('rag-message-generator-problem');
  expect(problemTextarea).toBeInTheDocument();
  fireEvent.change(problemTextarea, { target: { value: 'test update' } });
  expect(onMessageChange).toHaveBeenCalledWith({
    type: 'rag_message_generator',
    content: null,
    use_carryover: false,
    context: {
      key1: 'value1',
      problem: 'test update'
    }
  });
});
it('should display and update the carryover input with type string', () => {
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'string',
      use_carryover: false,
      content: '',
      context: {
        key1: 'value1'
      }
    } as WaldieMessage,
    skipCarryoverOption: false
  };
  const { baseElement } = render(<MessageInput {...customMessageInputProps} />);
  expect(baseElement).toBeTruthy();
  const carryOverCheckbox = screen.getByTestId('message-use-carryover');
  expect(carryOverCheckbox).toBeInTheDocument();
  fireEvent.click(carryOverCheckbox);
  expect(onMessageChange).toHaveBeenCalledWith({
    type: 'string',
    content: '',
    use_carryover: true,
    context: {
      key1: 'value1'
    }
  });
});
it('should display and update the carryover input with type rag_message_generator', () => {
  const customMessageInputProps = {
    ...messageInputProps,
    current: {
      type: 'rag_message_generator',
      use_carryover: false,
      content: '',
      context: {
        key1: 'value1'
      }
    } as WaldieMessage,
    skipCarryoverOption: false
  };
  const { baseElement } = render(<MessageInput {...customMessageInputProps} />);
  expect(baseElement).toBeTruthy();
  const carryOverCheckbox = screen.getByTestId('message-use-carryover');
  expect(carryOverCheckbox).toBeInTheDocument();
  fireEvent.click(carryOverCheckbox);
  expect(onMessageChange).toHaveBeenCalledWith({
    type: 'rag_message_generator',
    content: '',
    use_carryover: true,
    context: {
      key1: 'value1'
    }
  });
});
// it('should not display carryover input when type is method', () => {
//     const customMessageInputProps = {
//         ...messageInputProps,
//         current: {
//             type: 'method',
//             use_carryover: false,
//             content: '',
//             context: {
//                 key1: 'value1'
//             }
//         } as WaldieMessage,
//         skipCarryoverOption: false
//     };
//     const { baseElement } = render(
//         <MessageInput {...customMessageInputProps} />
//     );
//     expect(baseElement).toBeTruthy();
//     expect(
//         screen.queryByTestId('last-carryover-checkbox')
//     ).not.toBeInTheDocument();
// });

// it('should display and update the rag input', () => {
//     const onTypeChange = vi.fn();
//     const onMessageChange = vi.fn();
//     const messageInputProps = {
//         current: {
//             type: 'rag_message_generator',
//             content: '',
//             context: {
//                 key1: 'value1'
//             }
//         } as WaldieMessage,
//         defaultContent: 'test',
//         editorTheme: 'test',
//         selectLabel: 'test',
//         selectTestId: 'test',
//         onTypeChange,
//         onMessageChange,
//         includeContext: true,
//         skipCarryoverOption: true,
//         skipRagOption: false
//     };
//     const { baseElement } = render(<MessageInput {...messageInputProps} />);
//     expect(baseElement).toBeTruthy();
//     const problemTextarea = screen.getByTestId(
//         'rag-message-generator-problem'
//     );
//     expect(problemTextarea).toBeInTheDocument();
//     fireEvent.change(problemTextarea, { target: { value: 'test update' } });
//     expect(onMessageChange).toHaveBeenCalledWith({
//         type: 'rag_message_generator',
//         content: null,
//         context: {
//             key1: 'value1',
//             problem: 'test update'
//         }
//     });
// });

// it('should display and update the carryover input', () => {
//     const onTypeChange = vi.fn();
//     const onMessageChange = vi.fn();
//     const messageInputProps = {
//         current: {
//             type: 'last_carryover',
//             content: '',
//             context: {
//                 key1: 'value1'
//             }
//         } as WaldieMessage,
//         defaultContent: 'test',
//         editorTheme: 'test',
//         selectLabel: 'test',
//         selectTestId: 'test',
//         onTypeChange,
//         onMessageChange,
//         includeContext: true,
//         skipCarryoverOption: false,
//         skipRagOption: true
//     };
//     const { baseElement } = render(<MessageInput {...messageInputProps} />);
//     expect(baseElement).toBeTruthy();
//     const problemTextarea = screen.getByTestId('last-carryover-text');
//     expect(problemTextarea).toBeInTheDocument();
//     fireEvent.change(problemTextarea, { target: { value: 'test update' } });
//     expect(onMessageChange).toHaveBeenCalledWith({
//         type: 'last_carryover',
//         content: null,
//         context: {
//             key1: 'value1',
//             text: 'test update'
//         }
//     });
// });
// it('should update the current carryover input', () => {
//     const onTypeChange = vi.fn();
//     const onMessageChange = vi.fn();
//     const messageInputProps = {
//         current: {
//             type: 'last_carryover',
//             content: '',
//             context: {
//                 key1: 'value1',
//                 text: 'test'
//             }
//         } as WaldieMessage,
//         defaultContent: 'test',
//         editorTheme: 'test',
//         selectLabel: 'test',
//         selectTestId: 'test',
//         onTypeChange,
//         onMessageChange,
//         includeContext: true,
//         skipCarryoverOption: false,
//         skipRagOption: true
//     };
//     const { baseElement } = render(<MessageInput {...messageInputProps} />);
//     expect(baseElement).toBeTruthy();
//     const problemTextarea = screen.getByTestId('last-carryover-text');
//     expect(problemTextarea).toBeInTheDocument();
//     expect(problemTextarea).toHaveValue('test');
//     fireEvent.change(problemTextarea, { target: { value: 'test update' } });
//     expect(onMessageChange).toHaveBeenCalledWith({
//         type: 'last_carryover',
//         content: null,
//         context: {
//             key1: 'value1',
//             text: 'test update'
//         }
//     });
// });
