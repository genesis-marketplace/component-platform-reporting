import { suite, assert } from '@genesislcap/foundation-testing';
import { filterObjectArray } from './filterObjectArray';

const accesor = 'id';
const baseArray = [{ id: '1' }, { id: '2' }, { id: '3' }];

const FilterObjectArray = suite('filterObjectArray()');

FilterObjectArray('should return an array of the desired objects', () => {
  const removalArray = [{ id: '2' }];
  const result: Array<any> = filterObjectArray(accesor, baseArray, removalArray);

  assert.is(result.length, 2);
  assert.is(
    result.findIndex((item) => item.id === '2'),
    -1,
  );
  assert.is.not(
    result.findIndex((item) => item.id === '1'),
    -1,
  );
  assert.is.not(
    result.findIndex((item) => item.id === '3'),
    -1,
  );
});

FilterObjectArray(
  'should return array with same entries as baseArray if removalArray is empty',
  () => {
    const removalArray = [];
    const result: Array<any> = filterObjectArray(accesor, baseArray, removalArray);

    assert.is(result.length, 3);
    assert.is.not(
      result.findIndex((item) => item.id === '1'),
      -1,
    );
    assert.is.not(
      result.findIndex((item) => item.id === '2'),
      -1,
    );
    assert.is.not(
      result.findIndex((item) => item.id === '3'),
      -1,
    );
  },
);

FilterObjectArray('should return same entries as baseArray if removalArray is empty', () => {
  const removalArray = [];
  const result: Array<any> = filterObjectArray(accesor, baseArray, removalArray);

  assert.is(result.length, 3);
  assert.is.not(
    result.findIndex((item) => item.id === '1'),
    -1,
  );
  assert.is.not(
    result.findIndex((item) => item.id === '2'),
    -1,
  );
  assert.is.not(
    result.findIndex((item) => item.id === '3'),
    -1,
  );
});

FilterObjectArray(
  'should return same entries as baseArray if removalArray object cannot be found',
  () => {
    const removalArray = [{ id: 'this does not exist' }];
    const result: Array<any> = filterObjectArray(accesor, baseArray, removalArray);

    assert.is(result.length, 3);
    assert.is.not(
      result.findIndex((item) => item.id === '1'),
      -1,
    );
    assert.is.not(
      result.findIndex((item) => item.id === '2'),
      -1,
    );
    assert.is.not(
      result.findIndex((item) => item.id === '3'),
      -1,
    );
  },
);

FilterObjectArray('should return original array if no accesor provided', () => {
  const removalArray = [{ id: '2' }];
  const result: Array<any> = filterObjectArray(undefined, baseArray, removalArray);

  assert.is(result.length, 3);
  assert.is.not(
    result.findIndex((item) => item.id === '1'),
    -1,
  );
  assert.is.not(
    result.findIndex((item) => item.id === '2'),
    -1,
  );
  assert.is.not(
    result.findIndex((item) => item.id === '3'),
    -1,
  );
});

FilterObjectArray.run();
