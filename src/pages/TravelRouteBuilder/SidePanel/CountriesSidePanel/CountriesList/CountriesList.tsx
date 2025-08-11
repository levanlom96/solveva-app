import type { Country } from '../../../../../hooks/useCountries.tsx';
import './CountriesList.scss';

export interface CountriesListProps {
  countries: Country[];
}

const CountriesList = ({ countries }: CountriesListProps) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    country: Country
  ) => {
    const payload = {
      id: country.cca2,
      nodeType: 'countryNode',
      country: country,
    };

    e.dataTransfer.setData('application/json', JSON.stringify(payload));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className='countries-list'>
      {countries.map((country: Country) => {
        return (
          <div
            className='country'
            draggable
            key={country.cca2}
            onDragStart={(e) => handleDragStart(e, country)}
          >
            <div className='country__flag'>
              <img
                src={country.flags.svg}
                alt={country.name.official + ' flag'}
              />
            </div>
            <span className='country__name'>{country.name.official}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CountriesList;
