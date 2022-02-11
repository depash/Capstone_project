import { React } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/session';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  let NavButtons;
  const dispatch = useDispatch();
  const history = useHistory();
  const demoLogin = async (e) => {
    e.preventDefault()
    await dispatch(login('demo@aa.io', 'password'));
    return history.push(`/home`);
  };
  // if (sessionUser) {
  //   return <Redirect to='/home' />;
  // }
  // if (!sessionUser) {
  //   return <Redirect to='/' />;
  // }
  if (sessionUser) {
    NavButtons = (
      <>
        <li>
          <LogoutButton />
        </li>
      </>
    )
  } else {
    NavButtons = (
      <>
        <li>
          <a onClick={(e) => { demoLogin(e) }}>Demo</a>
        </li>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
      </>
    )
  }
  return (
    <>
      <nav id='navBar'>
        <ul id='navBarUl'>
          <NavLink id='HomeButton' to='/'>Pizzavio</NavLink>
          <div id='NavButtonContainer'>
            {NavButtons}
          </div>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
