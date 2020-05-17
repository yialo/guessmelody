import deepClone from './deep-clone.js';

describe('Create deep clone of object', () => {
  it('should throw an error if try to clone a function', () => {
    const regularFunction = function (someValue) {
      console.log(someValue);
    };

    const arrowFunction = (someValue) => {
      console.log(someValue);
    };

    assert.throws(() => deepClone(regularFunction));
    assert.throws(() => deepClone(arrowFunction));
  });

  it('should create clone of flat object', () => {
    const initialObject = {
      name: 'Vasya',
      age: 25,
      isMale: true,
    };

    const expectedResult = {
      name: 'Vasya',
      age: 25,
      isMale: true,
    };

    assert.deepEqual(deepClone(initialObject), expectedResult);
  });

  it('should create clone of flat array', () => {
    const initialArray = ['abc', true, 3, undefined, null];

    const expectedResult = ['abc', true, 3, undefined, null];

    assert.deepEqual(deepClone(initialArray), expectedResult);
  });

  it('should create clone of non-flat object with inner non-array objects', () => {
    const initialObject = {
      name: 'Vasya',
      age: 25,
      isMale: true,
      address: {
        country: 'Russia',
        isDefaultCity: false,
      },
      grade: {
        level: 'elementary',
        duration: 10,
      },
    };

    const expectedResult = {
      name: 'Vasya',
      age: 25,
      isMale: true,
      address: {
        country: 'Russia',
        isDefaultCity: false,
      },
      grade: {
        level: 'elementary',
        duration: 10,
      },
    };

    assert.deepEqual(deepClone(initialObject), expectedResult);
  });

  it('should create clone of non-flat object with inner array objects', () => {
    const initialObject = {
      name: 'Vasya',
      age: 25,
      isMale: true,
      arr: ['US', 10],
    };

    const expectedResult = {
      name: 'Vasya',
      age: 25,
      isMale: true,
      arr: ['US', 10],
    };

    assert.deepEqual(deepClone(initialObject), expectedResult);
  });

  it('should create clone of non-flat array with inner non-array objects', () => {
    const initialArray = [
      'abc',
      32324,
      { name: 'Bob', age: 30 },
    ];

    const expectedResult = [
      'abc',
      32324,
      { age: 30, name: 'Bob' },
    ];

    assert.deepEqual(deepClone(initialArray), expectedResult);
  });

  it('should create clone of non-flat array with inner arrays', () => {
    const initialArray = [
      null,
      'abc',
      ['name', 30],
      32324,
    ];

    const expectedResult = [
      null,
      'abc',
      ['name', 30],
      32324,
    ];

    assert.deepEqual(deepClone(initialArray), expectedResult);
  });
});
