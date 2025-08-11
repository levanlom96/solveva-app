import React from 'react';

import { Handle, NodeProps } from '@xyflow/react';
import { BeachIcon } from '../../../../components/Icons';

import './BeachNode.scss';

export type BeachNodeProps = NodeProps & {
  nodeUniqueData: {
    beachName: string;
    beachType: string;
    waterDepth: string;
  };
};

const BeachNode: React.FC<BeachNodeProps> = ({ data }: BeachNodeProps) => {
  const { beachName, beachType, waterDepth } = data.nodeUniqueData;

  return (
    <div className='beach-node' role='group' aria-label={`${beachName} beach`}>
      <div className='beach-node__header'>
        <div className='beach-node__icon-wrap'>
          <BeachIcon className='beach-node__icon' />
        </div>
      </div>

      <h3 className='beach-node__name' title={beachName}>
        {beachName}
      </h3>

      <div
        className='beach-node__details'
        aria-label={`Type: ${beachType}`}
        title={`Type: ${beachType}`}
      >
        <span className='beach-node__details-label'>Type</span>
        <span className='beach-node__details-value'>{beachType}</span>
      </div>

      <div
        className='beach-node__details'
        aria-label={`Water depth: ${waterDepth}`}
        title={`Water depth: ${waterDepth}`}
      >
        <span className='beach-node__details-label'>Depth</span>
        <span className='beach-node__details-value'>{waterDepth}</span>
      </div>

      <Handle type='source' position='bottom' />
      <Handle type='target' position='top' />
    </div>
  );
};

export default BeachNode;
