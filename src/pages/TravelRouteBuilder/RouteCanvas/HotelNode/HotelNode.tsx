import './HotelNode.scss';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import React from 'react';
import { HotelIcon, StarIcon } from '../../../../components/Icons';

export type HotelNodeData = {
  nodeUniqueData: {
    hotelName: string;
    starsAmount: number;
    nightsSpent: number;
  };
};

export type HotelNodeProps = NodeProps;

const HotelNode: React.FC<HotelNodeProps> = ({ data }: HotelNodeProps) => {
  const nodeData = data as HotelNodeData;
  const { hotelName, starsAmount, nightsSpent } = nodeData.nodeUniqueData;

  return (
    <div className='hotel-node' role='group' aria-label={`${hotelName} hotel`}>
      <div className='hotel-node__header'>
        <div className='hotel-node__icon-wrap'>
          <HotelIcon className='hotel-node__icon' />
        </div>
      </div>

      <h3 className='hotel-node__name' title={hotelName}>
        {hotelName}
      </h3>

      <div
        className='hotel-node__stars'
        aria-label={`${starsAmount} star rating`}
      >
        {Array.from({ length: Math.max(0, starsAmount) }).map((_, i) => (
          <StarIcon key={i} className='hotel-node__star' />
        ))}
      </div>

      <div
        className='hotel-node__nights'
        aria-label={`${nightsSpent} nights`}
        title={`${nightsSpent} nights`}
      >
        <span className='hotel-node__nights-count'>{nightsSpent}</span>
        <span className='hotel-node__nights-label'>nights</span>
      </div>

      <Handle type='source' position={Position.Bottom} />
      <Handle type='target' position={Position.Top} />
    </div>
  );
};

export default HotelNode;
