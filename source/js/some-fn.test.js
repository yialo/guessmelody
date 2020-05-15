import someFn from './some-fn.js';

describe('Some func', () => {
  it('should return correct data', () => {
    expect(someFn('Bob').toBe('Hello, Bob'));
  });
});
