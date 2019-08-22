export default (track, isAutoplay = false) => {
  const autoplayAttribute = isAutoplay ? ` autoplay="autoplay"` : ``;
  return (
    `<audio${autoplayAttribute} loop="loop">
      <source src="${track.audio}" type="audio/mpeg">
    </audio>`
  );
};
