import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { PropagateLoader } from 'react-spinners';
// Another way to import. This is recommended to reduce bundle size
// import ClipLoader from 'react-spinners/ClipLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div className='sweet-loading'>
                <PropagateLoader
                    css={override}
                    sizeUnit={"px"}
                    size={15}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default Test