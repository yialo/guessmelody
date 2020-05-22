// TODO: remove redundant code

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

export const restrictAbstractCall = () => {
  throw new Error('Instantiation of abstract class is restricted');
};

export const claimAbstractMethodDefinition = () => {
  throw new Error('Method need to be redefined for descendants');
};
