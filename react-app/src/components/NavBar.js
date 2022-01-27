import { React } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  let NavButtons;
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
          <NavLink to='/login' exact={true} activeClassName='active'>
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
