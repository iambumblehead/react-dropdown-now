declare module 'react-dropdown-now' {
  import * as React from 'react';
  export enum RenderType {
    OPTION,
    LABEL,
  }
  export interface Option {
    value: string;
    label: React.ReactNode;
    view?: React.ReactNode;
    id?: string;
    className?: string;
  }
  export interface MatchItem {
    option: Option;
    id: string;
    index: number;
    type: RenderType;
  }
  export interface Group {
    name: string;
    items: Option[];
  }

  type StringOrReactNode = string | React.ReactNode;
  type Value = Option | string;

  export interface ReactDropdownProps {
    options: (Group | Option | string | number)[];
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
    onChange?: (arg: Option, event: React.SyntheticEvent) => void;
    onFocus?: (arg: boolean) => void;
    onOpen?: () => void;
    onClose?: (closedBySelection: boolean) => void;
    matcher?: (item: MatchItem, value: Value) => void;
    value?: Value;
    placeholder?: String;
    innerRef: React.Ref;
  }

  export interface SelectionProps {
    disabled?: boolean;
    value?: Option | string;
    options: (Group | Option | string)[];
    onChange?: (arg: Option) => void;
    className?: string;
    baseClassName?: string;
    noOptionsDisplay?: StringOrReactNode;
  }

  class ReactDropdown extends React.Component<ReactDropdownProps> {}

  export default ReactDropdown;
}
