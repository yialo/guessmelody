const checkIsObject = (value) => (Boolean(value) && typeof value === 'object');

const deepClone = (target) => {
  if (typeof target === 'function') {
    throw new Error(`Can't clone function`);
  }

  if (Array.isArray(target)) {
    return target.map((it) => {
      if (checkIsObject(it)) {
        return deepClone(it);
      }

      return it;
    });
  }

  const output = {};
  const keys = Object.keys(target);

  for (const key of keys) {
    if (checkIsObject(key)) {
      output[key] = deepClone(target[key]);
    } else {
      output[key] = target[key];
    }
  }

  return output;
};

export default deepClone;
