import React from 'react';

import { Handle, NodeProps } from '@xyflow/react';
import { TrainIcon } from '../../../../components/Icons';

import './TrainStationNode.scss';

export type TrainStationNodeProps = NodeProps & {
  nodeUniqueData: {
    stationName: string;
    trainType: string;
    vibeCheck: string;
  };
};

const TrainStationNode: React.FC<TrainStationNodeProps> = ({
  data,
}: TrainStationNodeProps) => {
  const { stationName, trainType, vibeCheck } = data.nodeUniqueData;

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

      <Handle type='source' position='bottom' />
      <Handle type='target' position='top' />
    </div>
  );
};

export default TrainStationNode;
