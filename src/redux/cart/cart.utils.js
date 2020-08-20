const addItemToCart = (cartItems, cartItemToAdd) => {

    const itemExist = cartItems.find(cartItem => (cartItem.id === cartItemToAdd.id));

    if (itemExist) {
        return cartItems.map(cartItem => (
            cartItem.id === cartItemToAdd.id ?
             { ...cartItem, quantity: cartItem.quantity + 1 } :
             cartItem
        ));
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}];
};

export default addItemToCart;