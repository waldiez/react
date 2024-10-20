import { InfoCheckbox, InfoLabel, Select } from '@waldiez/components/inputs';
import { RagUserAgentConfigTabTextSplitViewProps } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/textSplit/types';

export const RagUserAgentConfigTabTextSplitView = (props: RagUserAgentConfigTabTextSplitViewProps) => {
  const {
    id,
    data,
    onChunkTokenSizeChange,
    onContextMaxTokensChange,
    onChunkModeChange,
    onMustBreakAtEmptyLineChange
  } = props;
  const { retrieveConfig } = data;
  return (
    <>
      <div className="flex-column">
        <InfoLabel
          label="Chunk Token Size:"
          info={
            'The chunk token size for the retrieve chat. ' +
            'If not provided, a default size `max_tokens * 0.4` will be used.'
          }
        />
        <input
          type="number"
          value={retrieveConfig.chunkTokenSize ?? ''}
          onChange={onChunkTokenSizeChange}
          data-testid={`rag-chunk-token-size-${id}`}
        />
      </div>
      <div className="flex-column">
        <InfoLabel
          label="Context Max Tokens:"
          info={
            'The context max token size for the retrieve chat. ' +
            'If not provided, a default size `max_tokens * 0.8` will be used.'
          }
        />
        <input
          type="number"
          value={retrieveConfig.contextMaxTokens ?? ''}
          onChange={onContextMaxTokensChange}
          data-testid={`rag-context-max-tokens-${id}`}
        />
      </div>
      <div className="flex-column">
        <InfoLabel
          label="Chunk Mode:"
          info={
            'The chunk mode for the retrieve chat. ' +
            'Possible values are "multi_lines" and "one_line". ' +
            'If not provided, a default mode `multi_lines` will be used.'
          }
        />
        <label className="hidden" htmlFor={`rag-chunk-mode-${id}`}>
          Chunk Mode
        </label>
        <Select
          options={chunkModeOptions}
          value={{
            label: chunkModeValuesMap[retrieveConfig.chunkMode],
            value: retrieveConfig.chunkMode
          }}
          onChange={onChunkModeChange}
          inputId={`rag-chunk-mode-${id}`}
        />
      </div>
      {retrieveConfig.chunkMode === 'multi_lines' && (
        <div className="flex-column">
          <InfoCheckbox
            label="Must Break at Empty Line "
            info={
              'Chunk will only break at empty line if True. Default is True. ' +
              'If chunk_mode is "one_line", this parameter will be ignored.'
            }
            checked={retrieveConfig.mustBreakAtEmptyLine}
            onChange={onMustBreakAtEmptyLineChange}
            dataTestId={`rag-must-break-at-empty-line-${id}`}
          />
        </div>
      )}
    </>
  );
};
const chunkModeOptions: { label: string; value: 'multi_lines' | 'one_line' }[] = [
  { label: 'Multi Lines', value: 'multi_lines' },
  { label: 'One Line', value: 'one_line' }
];

const chunkModeValuesMap = {
  multi_lines: 'Multi Lines',
  one_line: 'One Line'
};
