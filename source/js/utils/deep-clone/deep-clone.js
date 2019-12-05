const isFunction = (value) => (typeof value === 'function');
const isPrimitive = (value) => (
  value === null
  || ['string', 'number', 'boolean', 'symbol', 'undefined'].includes(typeof value)
);

const deepClone = (target) => {
  if (isFunction(target)) {
    throw new Error(`Can't clone functions`);
  }

  if (isPrimitive(target)) {
    return target;
  }

  if (Array.isArray(target)) {
    return target.map((it) => deepClone(it));
  }

  const output = {};

  Object.keys(target).forEach((key) => {
    output[key] = deepClone(target[key]);
  });

  return output;
};

export default deepClone;
