import React, { useReducer, ReactNode } from 'react';
import { AppContext } from './app.context.tsx';
import { appReducer, initialState } from './app.reducer.ts';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
