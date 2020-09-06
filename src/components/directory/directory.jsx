import React from 'react';
import './directory.scss';
import MenuItem from '../menu-item/menu-item';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

const Directory = ({ sections }) => (
  <div className="directory-menu">
      {
          sections.map(({id, ...otherVariables}) => (
              <MenuItem key={id} {...otherVariables}/>
          ))
      }
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);