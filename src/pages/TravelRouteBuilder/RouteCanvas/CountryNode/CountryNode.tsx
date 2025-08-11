
import type { Country } from '../../../../hooks/useCountries.tsx';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import './CountryNode.scss';

export type CountryNodeData = { country: Country };

export type CountryNodeProps = NodeProps;

const CountryNode = ({ data }: CountryNodeProps) => {
  const nodeData = data as CountryNodeData;
  const name = nodeData.country.name.official;
  const flag = nodeData.country.flags.svg;

  return (
    <div className='country-node' role='group' aria-label={`Country: ${name}`}>
      <div className='country-node__flag-wrap'>
        <img className='country-node__flag' src={flag} alt={`${name} flag`} />
      </div>

      <h3 className='country-node__name' title={name}>
        {name}
      </h3>

      <Handle type='source' position={Position.Bottom} />
      <Handle type='target' position={Position.Top} />
    </div>
  );
};

export default CountryNode;
