import './OtherChoice.scss';
import React from 'react';
import type { NodeTypeKey } from '../../../RouteCanvas/RouteCanvas.tsx';

export type NodeData = {
  id?: string;
  nodeType: NodeTypeKey;
  data: unknown;
};

export interface OtherChoiceProps {
  icon: React.FC;
  label: string;
  nodeData: NodeData;
}

function OtherChoice({ icon, label, nodeData }: OtherChoiceProps) {
  const Icon: React.FC<{ className: string }> = icon;

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    data: NodeData
  ) => {
    const payload = {
      data,
    };

    e.dataTransfer.setData('application/json', JSON.stringify(payload));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div
      className='other-choice'
      draggable
      onDragStart={(e) => handleDragStart(e, nodeData)}
    >
      <Icon className='other-choice__icon' />
      <span className='other-choice__label'>{label}</span>
    </div>
  );
}

export default OtherChoice;
