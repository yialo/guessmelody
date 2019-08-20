const extMap = { img: 'jpg', audio: 'mp3' };

export const getFilePath = (type, text) => (
  `./files/${type}/${text.toLowerCase().replace(/ /g, '_')}.${extMap[type]}`
);

const melodiesData = [
  ['Kevin MacLeod', 'Long Stroll', 'Jazz'],
  ['Jingle Punks', 'In the Land of Rhinoplasty', 'Rock'],
  ['Audionautix', 'Travel Light', 'Country'],
  ['Riot', 'Level Plane', 'R&B'],
  ['Jingle Punks', 'Lucky Day', 'Pop'],
  ['Quincas Moreira', 'Firefly', 'Electronic'],
];

class Melody {
  constructor(artist, name, genre) {
    this.artist = artist;
    this.name = name;
    this.genre = genre;
    this.getImage();
    this.getAudio();
  }

  getAudio() {
    this.audio = getFilePath('audio', this.name);
  }

  getImage() {
    this.image = getFilePath('img', this.artist);
  }
}

export default melodiesData.map((it) => new Melody(...it));
