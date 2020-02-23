import test from 'ava';

import { parseOptionsValue } from '../src/helpers';

test('parseOptionsValue("value", []), should return "value"', t => {
  t.is(parseOptionsValue([], 'value'), 'value');
});

test('parseOptionsValue("value 2", […]), should return value 2 item', t => {
  t.deepEqual(parseOptionsValue([ {
    type: 'group',
    items: [ {
      label: 'group label',
      value: 'group value'
    } ]
  }, {
    label: 'label 2',
    value: 'value 2'
  } ], 'value 2'), {
    label: 'label 2',
    value: 'value 2'
  });
});

test('parseOptionsValue("group value", […]), should return group value item', t => {
  t.deepEqual(parseOptionsValue([ {
    type: 'group',
    items: [ {
      label: 'group label',
      value: 'group value'
    } ]
  }, {
    label: 'label 2',
    value: 'value 2'
  } ], 'group value'), {
    label: 'group label',
    value: 'group value'
  });
});

test('parseOptionsValue("no value", […]), should return "no value"', t => {
  t.deepEqual(parseOptionsValue([ {
    type: 'group',
    items: [ {
      label: 'group label',
      value: 'group value'
    } ]
  }, {
    label: 'label 2',
    value: 'value 2'
  } ], 'no value'), 'no value');
});
