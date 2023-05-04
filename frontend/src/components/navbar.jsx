import { Link } from 'react-router-dom';

export default function NavBar({ status, setStatus }) {  

  function PlaceStatusText() {
    let statusText = '', statusAdmin = '';
    if (!status.log) {
      statusText = 'Not logged in';
    } else {
      statusText = `${status.user}`;
      status.admin ? statusAdmin = 'admin' : statusAdmin= 'user';
    }
    return (
      <div>
        User:
        <br />
        {statusText}
        <br />
        {statusAdmin}
      </div>
    );
  }

  function LogInOrOut() {
    if (!status.log) {
      return (
        <Link className='link' to='/login'>
          <div className='menu-item login'>
            Login
          </div>
        </Link>
      );
    } else {
      return (
        <Link className='link' to='/logout'>
          <div className='menu-item login'>
            Logout
          </div>
        </Link>
      );
    }
  }

  return (
    <div className='navbar'>
      <Link className='link' to='/'>
        <div className='logo'>
          <div>
            FS Bank App
          </div>            
        </div>
      </Link>
      <div className='menu'>
        <Link className='link' to='/signup'>
          <div className='menu-item'>
            Signup
          </div>
        </Link>
        <LogInOrOut/>
        <Link className='link' to='/deposit'>
          <div className='menu-item'>
            Deposit
          </div>
        </Link>
        <Link className='link' to='/withdraw'>
          <div className='menu-item'>
            Withdraw
          </div>
        </Link>
        <Link className='link' to='/alldata'>
          <div className='menu-item'>
            All Data
          </div>
        </Link>
      </div>
      <div className='status'>
        <PlaceStatusText />
      </div>
    </div>
  );
}