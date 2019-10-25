import { assert } from 'chai';
import { getFilePath } from './melodies';

describe('Returns file path', () => {
  it('Returns corrent address for audio track', () => {
    const answer = './files/audio/in_the_land_of_rhinoplasty.mp3';
    assert.strictEqual(getFilePath('audio', 'In the Land of Rhinoplasty'), answer);
  });
  it('Returns corrent address for image', () => {
    const answer = './files/img/kevin_macleod.jpg';
    assert.strictEqual(getFilePath('img', 'Kevin MacLeod'), answer);
  });
});
