import React from 'react';

import './shop.scss';

import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collection-overview/collection-overview';
import CollectionPage from '../collection/collection';
import WithSpinner from '../../components/with-spinner/with-spinner';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component
{
    unsubscribeFromSnapshot = null;
    
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render() {
        const { match, isCollectionFetching } = this.props;

        return (
            <div className="shop-page">
                <Route 
                exact 
                path={`${match.path}`} 
                render={props => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} 
                />
                <Route 
                path={`${match.path}/:collectionId`} 
                render={CollectionPageWithSpinner} 
                render={props => <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />} 
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);