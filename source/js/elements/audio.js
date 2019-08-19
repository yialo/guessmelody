const createAudioTemplate = (track) => (
  `<audio>
    <source src="${track.audio}" type="audio/mpeg">
  </audio>`
);

export default createAudioTemplate;
