import { createContext } from 'react';
import type { Dispatch } from 'react';
import { initialState } from './app.reducer.ts';
import type { AppAction, AppState } from './model.ts';

export interface AppContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => {},
});
