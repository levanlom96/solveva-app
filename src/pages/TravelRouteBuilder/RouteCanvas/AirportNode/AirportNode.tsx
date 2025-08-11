import React from 'react';

import { Handle, NodeProps } from '@xyflow/react';
import { AirportIcon } from '../../../../components/Icons';

import './AirportNode.scss';

export type AirportNodeProps = NodeProps & {
  nodeUniqueData: {
    airportName: string;
    flightTime: string;
  };
};

const AirportNode: React.FC<AirportNodeProps> = ({
  data,
}: AirportNodeProps) => {
  const { airportName, flightTime } = data.nodeUniqueData;

  return (
    <div
      className='airport-node'
      role='group'
      aria-label={`${airportName} airport`}
    >
      <div className='airport-node__header'>
        <div className='airport-node__icon-wrap'>
          <AirportIcon className='airport-node__icon' />
        </div>
      </div>

      <h3 className='airport-node__name' title={airportName}>
        {airportName}
      </h3>

      <div
        className='airport-node__flight-time'
        aria-label={`Flight time: ${flightTime}`}
        title={`Flight time: ${flightTime}`}
      >
        <span className='airport-node__flight-label'>Flight</span>
        <span className='airport-node__flight-value'>{flightTime}</span>
      </div>

      <Handle type='source' position='bottom' />
      <Handle type='target' position='top' />
    </div>
  );
};

export default AirportNode;
