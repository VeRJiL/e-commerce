import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>

        <div className="options">
            <Link className="option" to="/shop">Shop</Link>
            <Link className="option" to="/contact">Contact</Link>
            {
                currentUser ?
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                    <Link className="option" to="/signin">SIGN IN</Link>
            }
            
        </div>
    </div>
);

export default Header;