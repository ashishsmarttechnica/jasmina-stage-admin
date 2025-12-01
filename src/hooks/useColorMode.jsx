import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { useDispatch } from 'react-redux';
import { darkmodeAction } from '../redux/actions/darkModeAction';

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');
  const dispatch = useDispatch();
  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    colorMode === 'dark'
      ? bodyClass.add(className)
      : bodyClass.remove(className);
    dispatch(darkmodeAction(colorMode));
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
