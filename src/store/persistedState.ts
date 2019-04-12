export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");

    if (serializedState === null) {
      return undefined;
    }
    return { todo: { items: JSON.parse(serializedState) } };
  } catch (err) {
    return undefined;
  }
};

export const saveState = ({ todo }: any) => {
  try {
    const serializedState = JSON.stringify(todo.items);
    localStorage.setItem("todos", serializedState);
  } catch (err) {
    // Ignoring errors for now
  }
};
