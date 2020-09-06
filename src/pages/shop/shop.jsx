import React from 'react';

import './shop.scss';

import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collection-overview/collection-overview';
import CollectionPage from '../collection/collection';
import WithSpinner from '../../components/with-spinner/with-spinner';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component
{
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;
    
    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        })
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route 
                exact 
                path={`${match.path}`} 
                render={props => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} 
                />
                <Route 
                path={`${match.path}/:collectionId`} 
                render={CollectionPageWithSpinner} 
                render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />} 
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);