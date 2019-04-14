export const updateObject = (oldObject: Object, updatedProperties: Object) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};
