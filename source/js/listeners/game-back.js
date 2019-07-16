export default (containerElement, handler) => {
  const resetLink = containerElement.querySelector('.game__back');
  resetLink.addEventListener('click', () => handler());
};
