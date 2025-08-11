import './OtherSidePanel.scss';

export interface OtherSidePanelProps {
  hidden: boolean;
}

function OtherSidePanel({ hidden }: OtherSidePanelProps) {
  return (
    <div
      className={`other-side-panel ${hidden ? 'other-side-panel--hidden' : ''}`}
    ></div>
  );
}

export default OtherSidePanel;
