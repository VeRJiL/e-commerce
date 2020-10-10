import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon';
import CartDropdownContainer from '../cart-dropdown/cart-dropdown.container';

const Header = ({ currentUser, hidden }) => {
    
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>

            <div className="options">
                <Link className="option" to="/shop">Shop</Link>
                <Link className="option" to="/contact">Contact</Link>
                {
                    currentUser ?
                        <div className="option" style={{cursor: "pointer"}} onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                        <Link className="option" to="/signin">SIGN IN</Link>
                }

                <CartIcon />
                
            </div>
            { hidden ? null : <CartDropdownContainer /> }
        </div>
    )
};


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);