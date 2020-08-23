export const addItemToCart = (cartItems, cartItemToAdd) => {

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

export const clearItemFromCart = (cartItems, cartItemToBeRemoved) => {
    return cartItems.filter((cartItem) => (
        cartItem.id !== cartItemToBeRemoved.id
    ));
};

export const removeItemFromCart = (cartItems, cartItemToBeRemoved) => {
    
    const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToBeRemoved.id);

    if (!existingItem) {
        return [...cartItems];
    }

    if (existingItem.quantity === 1) {
        return clearItemFromCart(cartItems, cartItemToBeRemoved);
    }

    return cartItems.map(cartItem => (
        cartItem.id === cartItemToBeRemoved.id ?
        {...cartItem, quantity: cartItem.quantity - 1} :
        cartItem
    ));
};