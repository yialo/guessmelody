export const GameOptions = {
  QUESTIONS: 3,
  ATTEMPTS: 3,
  QUICK_THRESHOLD: 30,
  IS_DEBUG_ACTIVE: true,
};

const INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  currentQuestionIndex: 0,
};
Object.freeze(INITIAL_STATE);
export { INITIAL_STATE };
