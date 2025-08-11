import React from 'react';
import type { Country } from '../../../../hooks/useCountries.tsx';
import { Handle, NodeProps } from '@xyflow/react';
import './CountryNode.scss';

export type CountryNodeProps = NodeProps & { data: Country };

const CountryNode: React.FC<CountryNodeProps> = ({ data }) => {
  const name = data.country.name.official;
  const flag = data.country.flags.svg;

  return (
    <div className='country-node' role='group' aria-label={`Country: ${name}`}>
      <div className='country-node__flag-wrap'>
        <img className='country-node__flag' src={flag} alt={`${name} flag`} />
      </div>

      <h3 className='country-node__name' title={name}>
        {name}
      </h3>

      <Handle type='source' position='bottom' />
      <Handle type='target' position='top' />
    </div>
  );
};

export default CountryNode;
