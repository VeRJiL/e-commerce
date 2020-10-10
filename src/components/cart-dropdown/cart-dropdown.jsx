import React from 'react';
import './cart-dropdown.scss';
import CustomButton from '../custom-button/custom-button';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CartItem from '../cart-item/cart-item';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
                cartItems.map(cartItem => (
                    <CartItem key={ cartItem.id } item={ cartItem } />
                )) :
                <span className="empty-message">Your cart is empty</span>
            }
        </div>
        <CustomButton onClick={() => {
            dispatch(toggleCartHidden());
            history.push('/checkout');
            }}>GO TO CHECKOUT</CustomButton>
    </div>
);



export default CartDropdown;