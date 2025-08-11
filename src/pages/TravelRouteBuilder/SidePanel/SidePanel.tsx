import './SidePanel.scss';
import CountriesSidePanel from './CountriesSidePanel/CountriesSidePanel.tsx';
import { useState } from 'react';
import classNames from 'classnames';
import { useCountries } from '../../../hooks/useCountries.tsx';
import OtherSidePanel from './OtherSidePanel/OtherSidePanel.tsx';

const SidePanel = () => {
  const { countries, loading, error } = useCountries();

  const [otherPanelOpen, setOtherPanelOpen] = useState(true);

  return (
    <div className='side-panel'>
      <button
        className={classNames('side-panel__countries-button', {
          active: !otherPanelOpen,
        })}
        onClick={() => setOtherPanelOpen(false)}
      >
        Countries
      </button>
      <button
        className={classNames('side-panel__other-button', {
          active: otherPanelOpen,
        })}
        onClick={() => setOtherPanelOpen(true)}
      >
        Other
      </button>
      <CountriesSidePanel
        countries={countries}
        loading={loading}
        error={error}
        hidden={otherPanelOpen}
      />
      <OtherSidePanel hidden={!otherPanelOpen} />
    </div>
  );
};

export default SidePanel;
