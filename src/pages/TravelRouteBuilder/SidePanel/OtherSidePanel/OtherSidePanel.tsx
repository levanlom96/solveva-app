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
        nodeData={{
          nodeType: 'hotelNode',
          data: {
            hotelName: 'Cool Hotel',
            starsAmount: 4,
            nightsSpent: 5,
          },
        }}
      />
      <OtherChoice
        icon={AirportIcon}
        label={'Airport'}
        nodeData={{
          nodeType: 'airportNode',
          data: {
            airportName: 'Cool Airport',
            flightTime: '4:00 AM',
          },
        }}
      />
      <OtherChoice
        icon={PortIcon}
        label={'Port'}
        nodeData={{
          nodeType: 'portNode',
          data: {
            airportName: 'Cool Port',
            shipType: 'Cruise',
            dinnerAt: '9:00 PM',
          },
        }}
      />
      <OtherChoice
        icon={BbqIcon}
        label={'Barbeque'}
        nodeData={{
          nodeType: 'bbqNode',
          data: {
            airportName: 'Cool Barbeque Place',
            bbqType: 'Vegetables and Marshmallows',
            taste: 'Very good',
          },
        }}
      />
      <OtherChoice
        icon={BeachIcon}
        label={'Beach'}
        nodeData={{
          nodeType: 'beachNode',
          data: {
            beachName: 'Cool Beach',
            beachType: 'Surfing',
            waterDepth: 'Very deep',
          },
        }}
      />
      <OtherChoice
        icon={TrainIcon}
        label={'Train station'}
        nodeData={{
          nodeType: 'trainNode',
          data: {
            stationName: 'Cool Train Station',
            trainType: 'Steam Locomotive',
            vibeCheck: 'Very Cool Train',
          },
        }}
      />
    </div>
  );
}

export default OtherSidePanel;
