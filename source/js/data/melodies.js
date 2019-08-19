const extMap = { img: 'jpg', audio: 'mp3' };

const getFilePath = (type, text) => (
  `./files/${type}/${text.toLowerCase().replace(' ', '_')}.${extMap[type]}`
);

class Melody {
  constructor(artist, name, genre) {
    this.artist = artist;
    this.name = name;
    this.genre = genre;
    this.getImage();
    this.getAudio();
  }

  getImage() {
    return getFilePath('img', this.artist);
  }

  getAudio() {
    return getFilePath('audio', this.name);
  }
}

export default [
  new Melody('Kevin MacLeod', 'Long Stroll', 'Jazz'),
  new Melody('Jingle Punks', 'In the Land of Rhinoplasty', 'Rock'),
  new Melody('Audionautix', 'Travel Light', 'Country'),
  new Melody('Riot', 'Level Plane', 'R&B'),
  new Melody('Jingle Punks', 'Lucky Day', 'Pop'),
  new Melody('Quincas Moreira', 'Firefly', 'Electronic'),
];
