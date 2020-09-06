import React from 'react';
import './collection-item.scss';
import CustomButton from '../custom-button/custom-button';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions'

const CollectionItem = ({addItem, item}) => {

    const { imageUrl, name, price } = item;
    return (
        <div className="collection-item">
            <div className="image" 
            style={{
                backgroundImage: `url(${imageUrl})`
            }}/>

            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomButton inverted onClick={() => addItem(item)}>Add to cart</CustomButton>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);