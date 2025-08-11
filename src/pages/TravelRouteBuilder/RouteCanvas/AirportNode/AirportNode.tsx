import React from 'react';

import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { AirportIcon } from '../../../../components/Icons';

import './AirportNode.scss';

export type AirportNodeData = {
  nodeUniqueData: {
    airportName: string;
    flightTime: string;
  };
};

export type AirportNodeProps = NodeProps;

const AirportNode: React.FC<AirportNodeProps> = ({
  data,
}: AirportNodeProps) => {
  const nodeData = data as AirportNodeData;
  const { airportName, flightTime } = nodeData.nodeUniqueData;

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

      <Handle type='source' position={Position.Bottom} />
      <Handle type='target' position={Position.Top} />
    </div>
  );
};

export default AirportNode;
