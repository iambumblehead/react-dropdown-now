import * as React from 'react';
import { ITEM_TYPE } from './constants';

export interface BaseOption {
  value?: unknown;
  label?: React.ReactNode;
  view?: React.ReactNode;
  id?: string;
  className?: string;
  disabled?: boolean;
}

export interface Option extends BaseOption {
  items?: BaseOption[];
  name?: string;
}

export interface RenderItem {
  option: Option;
  id: string;
  index: number;
  type: ITEM_TYPE;
  label?: string;
}

export type InputValue = Option | string | number;

export interface CustomMenuProps {
  className?: string;
}

export interface SelectionProps {
  disabled?: boolean;
  value?: InputValue;
  options: InputValue[];
  onBlur?: (event: React.SyntheticEvent) => void;
  onChange?: (option: Option, event: React.SyntheticEvent) => void;
  onSelect?: (option: Option, event: React.SyntheticEvent) => void;
  matcher?: (item: RenderItem, value: InputValue) => boolean;
  className?: string;
  baseClassName?: string;
  noOptionsDisplay?: string | number | React.ReactNode;
  menu?: string | React.ComponentType<CustomMenuProps>;
}

export interface ReactDropdownProps extends SelectionProps {
  arrowClosed?: React.ReactNode;
  arrowOpen?: React.ReactNode;
  onFocus?: (arg: boolean) => void;
  onOpen?: () => void;
  onClose?: (closedBySelection: boolean) => void;
  placeholder?: string;
  innerRef?: React.RefObject<HTMLDivElement>;
  clearIcon?: React.ReactNode;
  isClearable?: boolean;
}
