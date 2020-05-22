const EXTENSION_MAP = { img: 'jpg', audio: 'mp3' };

export const getFilePath = (type, text) => (
  `./files/${type}/${text.toLowerCase().replace(/ /g, '_')}.${EXTENSION_MAP[type]}`
);

const MELODY_DATA_LIST = [
  ['Kevin MacLeod', 'Long Stroll', 'Jazz'],
  ['Jingle Punks', 'In the Land of Rhinoplasty', 'Rock'],
  ['Audionautix', 'Travel Light', 'Country'],
  ['Riot', 'Level Plane', 'R&B'],
  ['Jingle Punks', 'Lucky Day', 'Pop'],
  ['Quincas Moreira', 'Firefly', 'Electronic'],
];

class Melody {
  constructor(melodyDataTuple) {
    const [artist, name, genre] = melodyDataTuple;

    this.artist = artist;
    this.name = name;
    this.genre = genre;
    this.audio = getFilePath('audio', this.name);
    this.image = getFilePath('img', this.artist);
  }
}

export default MELODY_DATA_LIST.map((it) => new Melody(it));
