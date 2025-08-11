

import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { BeachIcon } from '../../../../components/Icons';

import './BeachNode.scss';

export type BeachNodeData = {
  nodeUniqueData: {
    beachName: string;
    beachType: string;
    waterDepth: string;
  };
};

export type BeachNodeProps = NodeProps;

const BeachNode = ({ data }: BeachNodeProps) => {
  const nodeData = data as BeachNodeData;
  const { beachName, beachType, waterDepth } = nodeData.nodeUniqueData;

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

      <Handle type='source' position={Position.Bottom} />
      <Handle type='target' position={Position.Top} />
    </div>
  );
};

export default BeachNode;
