export default {
  restrictAbstractCall() {
    throw new Error('Instantiation of abstract class is restricted');
  },

  claimMethodRedefinition() {
    throw new Error('Method need to be redefined for descendants');
  },
};
