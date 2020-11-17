export const reducer = (state, action) => {
  switch (action.type) {
    case 'data':
      return { ...state, data: action.data };
    case 'loading':
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
export const initialState = { loading: false, data: null };

export const initState = (initialCount) => {
  return initialCount;
};
