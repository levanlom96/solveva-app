import { ToastContainer } from 'react-toastify';
import { ReactFlowProvider } from '@xyflow/react';

import SidePanel from './SidePanel/SidePanel.tsx';
import RouteCanvas from './RouteCanvas/RouteCanvas.tsx';

import './TravelRouteBuilder.scss';

const TravelRouteBuilder = () => {
  return (
    <div className='route-builder'>
      <SidePanel />
      <ReactFlowProvider>
        <div className='app-panel'>
          <RouteCanvas />
        </div>
      </ReactFlowProvider>
      <ToastContainer />
    </div>
  );
}

export default TravelRouteBuilder;
