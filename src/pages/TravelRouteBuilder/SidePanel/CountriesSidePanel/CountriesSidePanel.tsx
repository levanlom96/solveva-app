import { useMemo, useState } from 'react';
import classNames from 'classnames';

import { GlobalIcon, MagnifyingGlassIcon } from '../../../../components/Icons';
import CountriesLoading from './CountriesLoading/CountriesLoading.tsx';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.tsx';
import CountriesList from './CountriesList/CountriesList.tsx';
import type { Country } from '../../../../hooks/useCountries.tsx';
import { useDebouncedValue } from '../../../../hooks/useDebounceValue.tsx';
import { normalize } from '../../../../utils/search.utils.ts';

import './CountriesSidePanel.scss';

export interface CountriesSidePanelProps {
  countries?: Country[];
  loading: boolean;
  error: string | null;
  hidden: boolean;
}

const CountriesSidePanel = ({
  countries,
  loading,
  error,
  hidden,
}: CountriesSidePanelProps) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);

  // Compute filtered list from debounced query
  const filteredCountries = useMemo<Country[]>(() => {
    if (!countries?.length) return [];
    const q = normalize(debouncedQuery.trim());
    if (!q) return countries;

    return countries.filter((c) => {
      const name = normalize(c.name?.official ?? '');
      const common = normalize(c.name?.common ?? '');
      const cca2 = normalize(c.cca2 ?? '');

      return name.includes(q) || common.includes(q) || cca2.includes(q);
    });
  }, [countries, debouncedQuery]);

  return (
    <div
      className={classNames('countries-side-panel', {
        'countries-side-panel--hidden': hidden,
      })}
    >
      <div className='countries-side-panel__search-container'>
        <div className='countries-side-panel__headline-container'>
          <div className='countries-side-panel__icon-and-text'>
            <GlobalIcon className='countries-side-panel__global-icon' />
            <span className='countries-side-panel__headline'>Countries</span>
          </div>

          <span className='countries-side-panel__filtered-amount'>
            {loading ? '...' : filteredCountries.length}
          </span>
        </div>

        <div className='countries-side-panel__input-container'>
          <MagnifyingGlassIcon className='countries-side-panel__magnifying-glass' />
          <input
            className='countries-side-panel__search-input'
            type='text'
            placeholder='Search countries...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className='countries-side-panel__countries-container'>
        {loading && <CountriesLoading />}

        {!loading && error && (
          <ErrorMessage message={'Failed to load countries.'} />
        )}

        {!loading && !error && (
          <>
            {filteredCountries.length > 0 ? (
              <CountriesList countries={filteredCountries} />
            ) : (
              <ErrorMessage
                title='Country not found'
                style='warning'
                message={`No countries match “${debouncedQuery}”.`}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CountriesSidePanel;
