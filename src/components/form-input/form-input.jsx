import React from 'react';
import './form-input.scss';

const FormInput = ({handlechange, label, ...otherProps}) => (
    <div className="group">
        <input className="form-input" onChange={handlechange} {...otherProps}/>

        {
            label ? (
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>
            ) : null
        }
    </div>
);

export default FormInput;