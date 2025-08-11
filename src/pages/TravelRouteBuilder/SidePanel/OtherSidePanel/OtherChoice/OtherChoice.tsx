import './OtherChoice.scss';
import React from 'react';

export interface OtherChoiceProps {
  icon: React.FC;
  label: string;
  reactFlowNodeType: string;
}

function OtherChoice({ icon, label }: OtherChoiceProps) {
  const Icon: React.FC<{ className: string }> = icon;

  return (
    <div className='other-choice'>
      <Icon className='other-choice__icon' />
      <span className='other-choice__label'>{label}</span>
    </div>
  );
}

export default OtherChoice;
