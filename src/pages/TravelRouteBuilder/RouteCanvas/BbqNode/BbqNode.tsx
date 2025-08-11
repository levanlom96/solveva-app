import React from 'react';

import { Handle, NodeProps } from '@xyflow/react';
import { BbqIcon } from '../../../../components/Icons';

import './BbqNode.scss';

export type BbqNodeProps = NodeProps & {
  nodeUniqueData: {
    bbqName: string;
    bbqType: string;
    taste: string;
  };
};

const BbqNode: React.FC<BbqNodeProps> = ({ data }: BbqNodeProps) => {
  const { bbqName, bbqType, taste } = data.nodeUniqueData;

  return (
    <div className='bbq-node' role='group' aria-label={`${bbqName} BBQ`}>
      <div className='bbq-node__header'>
        <div className='bbq-node__icon-wrap'>
          <BbqIcon className='bbq-node__icon' />
        </div>
      </div>

      <h3 className='bbq-node__name' title={bbqName}>
        {bbqName}
      </h3>

      <div
        className='bbq-node__details'
        aria-label={`Type: ${bbqType}`}
        title={`Type: ${bbqType}`}
      >
        <span className='bbq-node__details-label'>Type</span>
        <span className='bbq-node__details-value'>{bbqType}</span>
      </div>

      <div
        className='bbq-node__details'
        aria-label={`Taste: ${taste}`}
        title={`Taste: ${taste}`}
      >
        <span className='bbq-node__details-label'>Taste</span>
        <span className='bbq-node__details-value'>{taste}</span>
      </div>

      <Handle type='source' position='bottom' />
      <Handle type='target' position='top' />
    </div>
  );
};

export default BbqNode;
