import test from 'ava';

import { parseValue } from '../src/helpers';

test('parseValue("value", []), should return "value"', t => {
  t.is(parseValue('value', []), 'value');
});

test('parseValue("value 2", […]), should return value 2 item', t => {
  t.deepEqual(parseValue('value 2', [ {
    type: 'group',
    items: [ {
      label: 'group label',
      value: 'group value'
    } ]
  }, {
    label: 'label 2',
    value: 'value 2'
  } ]), {
    label: 'label 2',
    value: 'value 2'
  });
});

test('parseValue("group value", […]), should return group value item', t => {
  t.deepEqual(parseValue('group value', [ {
    type: 'group',
    items: [ {
      label: 'group label',
      value: 'group value'
    } ]
  }, {
    label: 'label 2',
    value: 'value 2'
  } ]), {
    label: 'group label',
    value: 'group value'
  });
});

test('parseValue("no value", […]), should return "no value"', t => {
  t.deepEqual(parseValue('no value', [ {
    type: 'group',
    items: [ {
      label: 'group label',
      value: 'group value'
    } ]
  }, {
    label: 'label 2',
    value: 'value 2'
  } ]), 'no value');
});
