import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { ExportJsonIcon } from '../Icons';
import { useAppState } from '../../hooks/useAppState.tsx';
import { exportJson } from '../../utils/export.utils.ts';
import { importJson } from '../../utils/import.utils.ts';
import SolvevaLogoIcon from '../Icons/SolvevaLogoIcon.tsx';

import './Navigation.scss';
import type {
  ReactFlowEdge,
  ReactFlowNode,
} from '../../pages/TravelRouteBuilder/RouteCanvas/RouteCanvas.tsx';

const Navigation = () => {
  const { state, dispatch } = useAppState();

  const location = useLocation();
  const hideButtons = location.pathname !== '/builder';

  return (
    <nav className='navigation'>
      <SolvevaLogoIcon />
      <div
        className={classNames('navigation__buttons', {
          'navigation__buttons--hidden': hideButtons,
        })}
      >
        <button
          className='navigation__button'
          title='Import Graph'
          onClick={async () => {
            try {
              const data = await importJson();

              // TODO: We need to make this smarter.
              // importJson does sanitize but we are not checking data structure anywhere.
              // Ideally we should use something like https://zod.dev/json-schema - validation.

              const typedData = data as Record<string, unknown>;
              if (
                typedData?.nodes &&
                Array.isArray(typedData.nodes) &&
                typedData.nodes.length > 0
              ) {
                dispatch({
                  type: 'SAVE_IMPORTED_TRAVEL_ROUTE',
                  payload: data as {
                    nodes: ReactFlowNode[];
                    edges: ReactFlowEdge[];
                  },
                });
              }
            } catch (err) {
              console.error(err);
              alert((err as Error).message);
            }
          }}
        >
          <span>Import Graph</span>
          <ExportJsonIcon className='navigation__export-icon' />
        </button>
        <button
          className='navigation__button'
          title='Export Json'
          onClick={() => {
            exportJson(state.travelRoute);
          }}
        >
          <span>Export Graph</span>
          <ExportJsonIcon className='navigation__export-icon' />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
