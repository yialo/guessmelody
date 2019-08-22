export const GameAmount = {
  QUESTIONS: 1,
  ATTEMPTS: 3,
  QUICK_THRESHOLD: 30,
};

const INITIAL_STATE = {
  minutes: 5,
  seconds: 0,
  mistakes: 0,
  currentQuestionIndex: 0,
};
Object.freeze(INITIAL_STATE);
export { INITIAL_STATE };
