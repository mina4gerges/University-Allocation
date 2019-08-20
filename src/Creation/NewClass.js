import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Creaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calssName: null,
        }
    }


    render() {
        let { calssName } = this.state;
        return (
            <div>
                <div className="row">
                    <Label className="col-3">Class Name</Label>
                    <Input
                        type="text"
                        name="calssName"
                        className="col-9"
                        value={calssName}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}

export default Creaction;
