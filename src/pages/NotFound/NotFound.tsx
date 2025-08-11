import './NotFound.scss';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='not-found'>
      <Link className='bouncy-button' to='/builder'>
        Launch App →
      </Link>
    </div>
  );
}

export default NotFound;
