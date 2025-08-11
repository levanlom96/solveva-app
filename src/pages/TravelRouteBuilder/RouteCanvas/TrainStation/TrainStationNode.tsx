import React from 'react';

import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { TrainIcon } from '../../../../components/Icons';

import './TrainStationNode.scss';

export type TrainStationNodeData = {
  nodeUniqueData: {
    stationName: string;
    trainType: string;
    vibeCheck: string;
  };
};

export type TrainStationNodeProps = NodeProps;

const TrainStationNode: React.FC<TrainStationNodeProps> = ({
  data,
}: TrainStationNodeProps) => {
  const nodeData = data as TrainStationNodeData;
  const { stationName, trainType, vibeCheck } = nodeData.nodeUniqueData;

  return (
    <div
      className='train-station-node'
      role='group'
      aria-label={`${stationName} station`}
    >
      <div className='train-station-node__header'>
        <div className='train-station-node__icon-wrap'>
          <TrainIcon className='train-station-node__icon' />
        </div>
      </div>

      <h3 className='train-station-node__name' title={stationName}>
        {stationName}
      </h3>

      <div
        className='train-station-node__details'
        aria-label={`Type: ${trainType}`}
        title={`Type: ${trainType}`}
      >
        <span className='train-station-node__details-label'>Type</span>
        <span className='train-station-node__details-value'>{trainType}</span>
      </div>

      <div
        className='train-station-node__details'
        aria-label={`Vibe check: ${vibeCheck}`}
        title={`Vibe check: ${vibeCheck}`}
      >
        <span className='train-station-node__details-label'>Vibe</span>
        <span className='train-station-node__details-value'>{vibeCheck}</span>
      </div>

      <Handle type='source' position={Position.Bottom} />
      <Handle type='target' position={Position.Top} />
    </div>
  );
};

export default TrainStationNode;
