import MELODY_DATA from './melodies.json';

const MELODY_DATA_LIST = MELODY_DATA.melodies;
const FILE_TYPE_MAP = {
  image: {
    dir: 'img',
    ext: 'jpg',
  },
  audio: {
    dir: 'audio',
    ext: 'mp3',
  },
};

const getFilePath = (type, filename) => {
  const { dir, ext } = FILE_TYPE_MAP[type];
  return `${process.env.PUBLIC_PATH}files/${dir}/${filename}.${ext}`;
};

class Melody {
  constructor(melodyData) {
    const {
      artist,
      title,
      genre,
      image,
      audio,
    } = melodyData;

    this.artist = artist;
    this.title = title;
    this.genre = genre;
    this.audio = getFilePath('audio', audio);
    this.image = getFilePath('image', image);
  }
}

export default MELODY_DATA_LIST.map((it) => new Melody(it));
