import ShopActionTypes from './shop.types';

const INITIAL_DATA = [];

const shopReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return  {
                ...state,
                collections: action.payload
            };

        default:
            return state;
    }
}

export default shopReducer;