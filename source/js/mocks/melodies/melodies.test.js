import { getFilePath } from './melodies.js';

describe('Returns asset file path', () => {
  it('Should return address for audio track', () => {
    const answer = './files/audio/in_the_land_of_rhinoplasty.mp3';
    expect(getFilePath('audio', 'In the Land of Rhinoplasty')).toBe(answer);
  });
  it('Should return address for image', () => {
    const answer = './files/img/kevin_macleod.jpg';
    expect(getFilePath('img', 'Kevin MacLeod')).toBe(answer);
  });
});
