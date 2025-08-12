import type {
  ReactFlowEdge,
  ReactFlowNode,
} from '../pages/TravelRouteBuilder/RouteCanvas/RouteCanvas.tsx';
import type { ValidatedTravelRoute } from '../utils/validation.utils.ts';

interface ReactFlowData {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdge[];
}

export interface AppState {
  travelRoute: ReactFlowData;
  importedTravelRoute: ValidatedTravelRoute | null;
}

export type AppAction =
  | { type: 'SAVE_TRAVEL_ROUTE'; payload: ReactFlowData }
  | {
      type: 'SAVE_IMPORTED_TRAVEL_ROUTE';
      payload: ValidatedTravelRoute | null;
    };
