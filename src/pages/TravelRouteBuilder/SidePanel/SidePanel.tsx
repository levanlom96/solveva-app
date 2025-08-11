import './SidePanel.scss';
import CountriesSidePanel from './CountriesSidePanel/CountriesSidePanel.tsx';
import { useState } from 'react';
import { useCountries } from '../../../hooks/useCountries.tsx';
import OtherSidePanel from './OtherSidePanel/OtherSidePanel.tsx';

function SidePanel() {
  const { countries, loading, error } = useCountries();

  const [otherPanelOpen, setOtherPanelOpen] = useState(true);

  return (
    <div className='side-panel'>
      <button
        className={`side-panel__countries-button ${!otherPanelOpen ? 'active' : ''}`}
        onClick={() => setOtherPanelOpen(false)}
      >
        Countries
      </button>
      <button
        className={`side-panel__other-button ${otherPanelOpen ? 'active' : ''}`}
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
}

export default SidePanel;
