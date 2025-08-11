import type { AppAction, AppState } from './model.ts';

export const initialState: AppState = {
  travelRoute: {
    nodes: [],
    edges: [],
  },
  importedTravelRoute: null,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SAVE_TRAVEL_ROUTE':
      return { ...state, travelRoute: action.payload };
    case 'SAVE_IMPORTED_TRAVEL_ROUTE':
      return { ...state, importedTravelRoute: action.payload };
    default:
      return state;
  }
}
