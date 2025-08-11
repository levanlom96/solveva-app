import './CountryNode.scss';
import type { Country } from '../../../../hooks/useCountries.tsx';
import { Handle, NodeProps } from '@xyflow/react';
import { JSX } from 'react';

export type CountryNodeProps = NodeProps & { data: Country };

const CountryNode: ({ data }: CountryNodeProps) => JSX.Element = ({
  data,
}: CountryNodeProps) => {
  return (
    <div className='country-node'>
      <img
        className='country-node__flag'
        src={data.country.flags.svg}
        alt={data.country.name.official + ' flag'}
      />
      <span className='country-node__name'>{data.country.name.official}</span>
      <Handle type='source' position='bottom' />
      <Handle type='target' position='top' />
    </div>
  );
};

export default CountryNode;
