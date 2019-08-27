import React from 'react';
import { Input } from 'reactstrap';

export default function DateTimePickerComp(props) {
    let { name, value, className, onChange, onBlur, errorMsg } = props
    return (
        <div className='row'>
            <div className='col-12' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                <Input
                    type="text"
                    name={name}
                    value={value}
                    className={className}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
            {
                errorMsg &&
                <div className='col-12' style={{ paddingLeft: '0px', paddingRight: '0px', color: 'red' }}>
                    {errorMsg}
                </div>
            }
        </div>
    );
}
