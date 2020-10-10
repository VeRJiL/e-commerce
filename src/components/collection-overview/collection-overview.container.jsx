import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsFetching } from '../../redux/shop/shop.selectors';

import WithSpinner from '../with-spinner/with-spinner';
import CollectionOverView from './collection-overview';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching
});

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverView);

export default CollectionOverviewContainer;