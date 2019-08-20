export const updateMistakesCount = (state) => {
  state.mistakes += 1;
};

export const getMistakesCount = (state) => state.mistakes;

export const addLogoClickHandler = ($container, onClick) => {
  const resetLink = $container.querySelector('.game__back');
  resetLink.addEventListener('click', () => onClick());
};
