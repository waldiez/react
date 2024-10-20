// react-select with common styles
import ReactSelect, { GroupBase, MultiValue, Props, SingleValue } from 'react-select';

export type { SingleValue, MultiValue };

export function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      {...props}
      className="select"
      classNamePrefix={'w-select'}
      styles={{
        menu: provided => ({
          ...provided,
          zIndex: 9999,
          width: 'max-content',
          minWidth: '100%'
        })
      }}
    />
  );
}
