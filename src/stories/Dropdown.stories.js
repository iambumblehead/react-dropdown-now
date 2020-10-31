import React from 'react';
import get from 'lodash/get';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

import '../../style.css';
import './assets/custom.css';

import Dropdown from '../Dropdown';

export default {
  title: 'Examples/Dropdown',
  component: Dropdown,
  argTypes: {
    className: {
      control: { type: 'select', options: ['clear', 'my-custom-class'] },
    },
  },
};

const defaultMatcher = (item, option) => {
  const { value } = item.option;
  return value === option || value === get(option, 'value');
};

const Template = (args) => <Dropdown {...args} />;

export const FlatArrayExample = Template.bind({});
FlatArrayExample.args = {
  options: ['one', 'two', 'three'],
  onChange: (option) => {
    console.log('You selected ', option.label);
  },
  matcher: defaultMatcher,
  onClose: () => undefined,
  onOpen: () => undefined,
  className: '',
};

export const objectArrayExample = Template.bind({});
objectArrayExample.args = {
  ...FlatArrayExample.args,
  options: [
    { value: 'one', label: 'One' },
    {
      value: 'two',
      label: 'Two',
    },
    {
      name: 'group1',
      items: [
        {
          value: 'three',
          label: 'Three',
        },
        { value: 'four', label: 'Four' },
      ],
    },
    {
      name: 'group2',
      items: [
        { value: 'five', label: 'Five' },
        { value: 'six', label: 'Six' },
      ],
    },
  ],
};

export const zeroValObjectArrayExample = Template.bind({});
zeroValObjectArrayExample.args = {
  ...FlatArrayExample.args,
  options: [
    { value: 0, label: 'Zero' },
    { value: 1, label: 'One' },
  ],
};

export const customArrowExample = Template.bind({});
const arrowClosed = <span className="arrow-closed rdn-control-icon">X</span>;
const arrowOpen = <span className="arrow-opened rdn-control-icon">V</span>;

customArrowExample.args = {
  ...FlatArrayExample.args,
  arrowClosed,
  arrowOpen,
  options: ['one', 'two', 'three'],
};

export const CustomMenuContainer = Template.bind({});
const MenuContainer = ({ className, ...props }) => {
  return (
    <Scrollbars
      {...props}
      className={classNames(className)}
      autoHeight
      autoHeightMin={0}
      autoHeightMax={200}
      onUpdate={(values) =>
        console.log(`scrolled update:`,values)
      }
    />
  );
}
CustomMenuContainer.args = {
  ...FlatArrayExample.args,
  options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  menu: MenuContainer
};
