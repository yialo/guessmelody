// export default {
//   restrictConstructorCall: () => {
//     throw new Error('Abstract class contructor call restricted');
//   },

//   requireMethodRedefinition: () => {
//     throw new Error('Method must be defined in descendant class');
//   },

//   requireProp: (propName) => {
//     throw new Error(`Required '${propName}' prop is not defined`);
//   },

//   badPropValue: (propName, propValue) => {
//     throw new Error(`Unexpected value ${propValue} of prop ${propName}`);
//   },
// };

export default {
  restrictAbstractCall() {
    throw new Error('Instantiation of abstract class is restricted');
  },

  claimMethodRedefinition() {
    throw new Error('Method need to be redefined for descendants');
  },
};
