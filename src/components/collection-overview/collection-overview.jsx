import React from 'react';
import './collection-overview.scss';

import CollectionPreview from '../collection-preview/collection-preview';

import { connect } from 'react-redux';
import { selectCollectionAsArray } from '../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';

const CollectionOverview = ({ collections }) => (
    <div className="collections-overview">
        {
            collections.map(({id, ...otherProps}) => (
                <CollectionPreview key={id} {...otherProps} />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionAsArray
});

export default connect(mapStateToProps)(CollectionOverview);