import './Home.scss';
import Avatar from '../../assets/levan.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__center-container'>
        <div className='home__avatar-holder'>
          <img className='home__avatar' src={Avatar as string} alt='Avatar' />
        </div>
        <h1 className='home__heading home__heading--h1'>
          Hi, I&#39;m Levan 👋
        </h1>
        <h2 className='home__heading home__heading--h2'>
          Welcome to My Interview Project
        </h2>
        <Link className='bouncy-button' to='/builder'>
          Launch App →
        </Link>
      </div>
    </div>
  );
};

export default Home;
