import React from 'react';
import './menu-item.scss';
import { withRouter } from 'react-router-dom';

const MenuItem = ({id, title, imageUrl, size, linkUrl, history, match, location}) => (
    <div 
    style={{
        backgroundImage: `url(${imageUrl})`
    }}
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
);

export default withRouter(MenuItem);