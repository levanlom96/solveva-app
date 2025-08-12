import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { ExportJsonIcon } from '../Icons';
import { useAppState } from '../../hooks/useAppState.tsx';
import { exportJson } from '../../utils/export.utils.ts';
import { importJson } from '../../utils/import.utils.ts';
import { validateTravelRoute } from '../../utils/validation.utils.ts';
import SolvevaLogoIcon from '../Icons/SolvevaLogoIcon.tsx';

import './Navigation.scss';

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

              // Validate the imported data structure using Zod schema
              const validatedData = validateTravelRoute(data);

              if (validatedData.nodes.length > 0) {
                dispatch({
                  type: 'SAVE_IMPORTED_TRAVEL_ROUTE',
                  payload: validatedData,
                });
              } else {
                alert(
                  'The imported file contains no nodes. Please import a valid travel route.'
                );
              }
            } catch (err) {
              console.error('Import failed:', err);
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
