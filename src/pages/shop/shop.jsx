import React from 'react';
import SHOP_DATA from './shop-data';
import './shop.scss';
import CollectionPreview from '../../components/collection-preview/collection-preview';

class ShopPage extends React.Component
{
    constructor() {
        super();

        this.state = {
            collections: SHOP_DATA
        }

    }

    render() {
        const {collections} = this.state;

        return (
            <div className="shop-page">
                {
                    collections.map(({id, ...otherProps}) => (
                        <CollectionPreview key={id} {...otherProps} />
                    ))
                }
            </div>
        )
    }
}

export default ShopPage;