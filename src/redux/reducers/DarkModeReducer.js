const localStorageKey = 'color-theme';
const storedColorMode = localStorage.getItem(localStorageKey);

const initialState = {
  colorMode: storedColorMode || 'light',
};

const darkModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COLOR_MODE':
      return {
        ...state,
        colorMode: action.payload,
      };
    default:
      return state;
  }
};

export default darkModeReducer;
