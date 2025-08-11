import './SidePanel.scss';
import CountriesSidePanel from './CountriesSidePanel/CountriesSidePanel.tsx';
import { useState } from 'react';
import { useCountries } from '../../../hooks/useCountries.tsx';

function SidePanel() {
  const { countries, loading, error } = useCountries();
  const [otherPanelOpen, setOtherPanelOpen] = useState(false);

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
      <CountriesSidePanel
        countries={countries}
        loading={loading}
        error={error}
        hidden={otherPanelOpen}
      />
    </div>
  );
}

export default SidePanel;
