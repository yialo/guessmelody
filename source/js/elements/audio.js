export default (track, isAutoplay = false) => {
  // const autoplayAttribute = isAutoplay ? ` autoplay="autoplay"` : ``;
  const autoplayAttribute = ``;

  return (
    `<audio${autoplayAttribute} loop="loop">
      <source src="${track.audio}" type="audio/mpeg">
    </audio>`
  );
};
