import { prepareOptions } from '../helpers';
import { ITEM_TYPE } from '../constants';

describe('prepareOptions([…])', () => {
  it('should return flat list of render items', () => {
    const input = [
      {
        label: 'label 1',
        value: 'value 1',
      },
      {
        items: [
          {
            label: 'group label',
            value: 'group value',
          },
          {
            label: 'group label 2',
            value: 'group value 2',
          },
        ],
      },
      {
        label: 'label 2',
        value: 'value 2',
        id: 'custom-id-1',
        view: 'custom-view',
        className: 'custom-class',
      },
      {
        name: 'group with name',
        items: [
          {
            label: 'group label',
            value: 0,
            id: 'custom-id-2',
          },
          {
            label: 'group label 2',
            value: 1,
            id: 'custom-id-3',
          },
        ],
      },
      // non-object options
      'option-as-string',
      1000,

      // invalid types (should not be included)
      /regex-type/,
      [1, 2, 3], // will not parse, may as well use object syntax instead
      true,
      false,
      undefined,
      null,
    ];

    const expected = [
      {
        type: ITEM_TYPE.OPTION,
        id: 'value 1',
        index: 0,
        option: {
          label: 'label 1',
          value: 'value 1',
        },
      },
      [
        {
          type: ITEM_TYPE.LABEL,
          label: undefined,
        },
        {
          type: ITEM_TYPE.OPTION,
          id: 'group value',
          index: 1,
          option: {
            label: 'group label',
            value: 'group value',
          },
        },
        {
          type: ITEM_TYPE.OPTION,
          id: 'group value 2',
          index: 2,
          option: {
            label: 'group label 2',
            value: 'group value 2',
          },
        },
      ],
      {
        type: ITEM_TYPE.OPTION,
        id: 'custom-id-1',
        index: 3,
        option: {
          label: 'label 2',
          value: 'value 2',
          id: 'custom-id-1',
          view: 'custom-view',
          className: 'custom-class',
        },
      },

      // second group
      [
        {
          type: ITEM_TYPE.LABEL,
          label: 'group with name',
        },
        {
          type: ITEM_TYPE.OPTION,
          id: 'custom-id-2',
          index: 4,
          option: {
            label: 'group label',
            value: 0,
            id: 'custom-id-2',
          },
        },
        {
          type: ITEM_TYPE.OPTION,
          id: 'custom-id-3',
          index: 5,
          option: {
            label: 'group label 2',
            value: 1,
            id: 'custom-id-3',
          },
        },
      ],
      {
        type: ITEM_TYPE.OPTION,
        id: 'option-as-string',
        index: 6,
        option: {
          label: 'option-as-string',
          value: 'option-as-string',
        },
      },
      {
        type: ITEM_TYPE.OPTION,
        id: 1000,
        index: 7,
        option: {
          label: 1000,
          value: 1000,
        },
      },
    ];

    expect(prepareOptions(input)).toEqual(expected);
  });
});
