declare module 'react-dropdown-now' {
  import * as React from 'react';
  export interface Option {
    label: React.ReactNode;
    value: string;
    className?: string;
  }
  export interface Group {
    type: 'group';
    name: string;
    items: Option[];
  }

  type StringOrReactNode = string | React.ReactNode;

  export interface ReactDropdownProps {
    options: (Group | Option | string)[];
    baseClassName?: string;
    className?: string;
    controlClassName?: string;
    placeholderClassName?: string;
    menuClassName?: string;
    arrowClassName?: string;
    noOptionsDisplay?: StringOrReactNode;
    disabled?: boolean;
    arrowClosed?: React.ReactNode;
    arrowOpen?: React.ReactNode;
    onChange?: (arg: Option) => void;
    onFocus?: (arg: boolean) => void;
    onOpen?: () => void;
    onClose?: () => void;
    value?: Option | string;
    placeholder?: String;
  }

  export interface MenuProps {
    options: (Group | Option | string)[];
    onSelect: (e: Event, value: string, label: StringOrReactNode) => void;
    className?: string;
    expanded?: boolean;
    selected?: string | Option;
    baseClassName?: string;
    noOptionsDisplay?: StringOrReactNode;
  }

  class ReactDropdown extends React.Component<ReactDropdownProps> {}

  export default ReactDropdown;
}
