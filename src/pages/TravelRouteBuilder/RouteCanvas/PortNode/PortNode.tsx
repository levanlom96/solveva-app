import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { PortIcon } from '../../../../components/Icons';

import './PortNode.scss';

export type PortNodeData = {
  nodeUniqueData: {
    portName: string;
    shipType: string;
    dinnerAt: string;
  };
};

export type PortNodeProps = NodeProps;

const PortNode = ({ data }: PortNodeProps) => {
  const nodeData = data as PortNodeData;
  const { portName, shipType, dinnerAt } = nodeData.nodeUniqueData;

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

      <Handle type='source' position={Position.Bottom} />
      <Handle type='target' position={Position.Top} />
    </div>
  );
};

export default PortNode;
