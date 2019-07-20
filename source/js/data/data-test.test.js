import {assert} from 'chai';

describe('Array', () => {
  describe('#indexOf', () => {
    it('Should return -1 when the value is not present', () =>
      assert.equal(-1, [1, 2, 3].indexOf(4))
    );
  });
});
