const GameOptions = {
  QUESTIONS: 10,
  ATTEMPTS: 3,
  QUICK_THRESHOLD: 30,
  IS_DEBUG_ACTIVE: true,
};
Object.freeze(GameOptions);

const INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  currentQuestionIndex: 0,
};
Object.freeze(INITIAL_STATE);

export { GameOptions, INITIAL_STATE };
