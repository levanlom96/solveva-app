import { ExclamationMarkIcon } from '../Icons';

import './ErrorMessage.scss';

interface ErrorMessageProps {
  title?: string;
  style?: 'error' | 'warning';
  message: string;
}

export default function ErrorMessage({
  title = 'Error',
  style = 'error',
  message,
}: ErrorMessageProps) {
  return (
    <div
      className={`error-message ${style === 'warning' ? 'error-message--warning' : ''}`}
    >
      <ExclamationMarkIcon className='error-message__icon' />
      <div className='error-message__text'>
        <h4 className='error-message__title'>{title}</h4>
        <p className='error-message__description'>{message}</p>
      </div>
    </div>
  );
}
