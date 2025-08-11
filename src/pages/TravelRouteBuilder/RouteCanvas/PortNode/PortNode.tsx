import React from 'react';
import { Handle, NodeProps } from '@xyflow/react';
import { PortIcon } from '../../../../components/Icons';

import './PortNode.scss';

export type PortNodeProps = NodeProps & {
  nodeUniqueData: {
    portName: string;
    shipType: string;
    dinnerAt: string;
  };
};

const PortNode: React.FC<PortNodeProps> = ({ data }: PortNodeProps) => {
  const { portName, shipType, dinnerAt } = data.nodeUniqueData;

  return (
    <div className='port-node' role='group' aria-label={`${portName} port`}>
      <div className='port-node__header'>
        <div className='port-node__icon-wrap'>
          <PortIcon className='port-node__icon' />
        </div>
      </div>

      <h3 className='port-node__name' title={portName}>
        {portName}
      </h3>

      <div
        className='port-node__details'
        aria-label={`Ship type: ${shipType}`}
        title={`Ship type: ${shipType}`}
      >
        <span className='port-node__details-label'>Ship</span>
        <span className='port-node__details-value'>{shipType}</span>
      </div>

      <div
        className='port-node__details'
        aria-label={`Dinner at: ${dinnerAt}`}
        title={`Dinner at: ${dinnerAt}`}
      >
        <span className='port-node__details-label'>Dinner</span>
        <span className='port-node__details-value'>{dinnerAt}</span>
      </div>

      <Handle type='source' position='bottom' />
      <Handle type='target' position='top' />
    </div>
  );
};

export default PortNode;
