import React from 'react';
import get from 'lodash/get';
import '../../style.css';
import './assets/custom.css';

import Dropdown from '../Dropdown';

export default {
  title: 'Example/Dropdown',
  component: Dropdown,
  argTypes: {
    className: {
      control: { type: 'select', options: ['clear', 'my-custom-class'] },
    }
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
const arrowClosed = <span className="arrow-closed">X</span>;
const arrowOpen = <span className="arrow-closed">V</span>;

customArrowExample.args = {
  ...FlatArrayExample.args,
  arrowClosed,
  arrowOpen,
  options: ['one', 'two', 'three'],
};
