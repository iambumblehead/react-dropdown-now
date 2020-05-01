declare module 'react-dropdown-now' {
  import * as React from 'react';
  export interface Option {
    value: any;
    label: React.ReactNode;
    view?: React.ReactNode;
    id?: string;
    className?: string;
  }
  export interface Group {
    name: string;
    items: Option[];
  }

  export enum RenderType {
    OPTION,
    LABEL,
  }
  export interface RenderItem {
    option: Option;
    id: string;
    index: number;
    type: RenderType;
  }

  export type Value = Option | string | number;

  export interface SelectionProps {
    disabled?: boolean;
    value?: Value;
    options: (Group | Option | string | number)[];
    onChange?: (arg: Option, event: React.SyntheticEvent) => void;
    matcher?: (item: RenderItem, value: Value) => void;
    className?: string;
    baseClassName?: string;
    noOptionsDisplay?: React.ReactNode;
  }

  export interface ReactDropdownProps extends SelectionProps {
    controlClassName?: string;
    placeholderClassName?: string;
    menuClassName?: string;
    arrowClassName?: string;
    arrowClosed?: React.ReactNode;
    arrowOpen?: React.ReactNode;
    onFocus?: (arg: boolean) => void;
    onOpen?: () => void;
    onClose?: (closedBySelection: boolean) => void;
    placeholder?: String;
    innerRef?: React.Ref;
  }

  class ReactDropdown extends React.Component<ReactDropdownProps> {}
  export class ReactSelection extends React.Component<SelectionProps> {}

  export default ReactDropdown;
}
