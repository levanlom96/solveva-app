import './OtherSidePanel.scss';
import OtherChoice from './OtherChoice/OtherChoice.tsx';
import {
  AirportIcon,
  BbqIcon,
  BeachIcon,
  HotelIcon,
  PortIcon,
  TrainIcon,
} from '../../../../components/Icons';

export interface OtherSidePanelProps {
  hidden: boolean;
}

function OtherSidePanel({ hidden }: OtherSidePanelProps) {
  return (
    <div
      className={`other-side-panel ${hidden ? 'other-side-panel--hidden' : ''}`}
    >
      <OtherChoice
        icon={HotelIcon}
        label={'Hotel'}
        reactFlowNodeType={'hotelNode'}
      />
      <OtherChoice
        icon={AirportIcon}
        label={'Airport'}
        reactFlowNodeType={'airportNode'}
      />
      <OtherChoice
        icon={PortIcon}
        label={'Port'}
        reactFlowNodeType={'portNode'}
      />
      <OtherChoice
        icon={BbqIcon}
        label={'Barbeque'}
        reactFlowNodeType={'bbqNode'}
      />
      <OtherChoice
        icon={BeachIcon}
        label={'Beach'}
        reactFlowNodeType={'bbqNode'}
      />
      <OtherChoice
        icon={TrainIcon}
        label={'Train station'}
        reactFlowNodeType={'trainNode'}
      />
    </div>
  );
}

export default OtherSidePanel;
