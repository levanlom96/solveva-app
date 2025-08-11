import { useContext } from 'react';
import { AppContext } from '../store/app.context.tsx';

export const useAppState = () => {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
};
