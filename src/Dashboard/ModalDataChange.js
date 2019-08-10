import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class ModalDataChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSelected: cloneDeep(this.props.dataSelected),
        }
    }

    handleChange = event => {
        let { name, value } = event.target;
        let { dataSelected } = this.state;
        dataSelected[name] = value;
        this.setState({ dataSelected })
    }


    render() {
        let { onClose, open, handleModalSave } = this.props;
        let { dataSelected } = this.state;

        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" className='modal-data-change'>
                <DialogContent>
                    <DialogContentText>
                        Please add your new modification
                        </DialogContentText>
                    <div className='row'>
                        <div className='çol-2'><label>Class :</label></div>
                        <div className=' col-8'><input type='text' name='className' onChange={this.handleChange} value={dataSelected.className} className='form-control' /></div>
                    </div>
                    <div className='row'>
                        <div className='çol-2'><label>Date :</label></div>
                        <div className=' col-8'><input type='text' name='date' onChange={this.handleChange} value={dataSelected.date} className='form-control' /></div>
                    </div>
                    <div className='row'>
                        <div className='çol-2'><label>Start Time : </label></div>
                        <div className=' col-8'><input type='text' name='startTime' onChange={this.handleChange} value={dataSelected.startTime} className='form-control' /></div>
                    </div>
                    <div className='row'>
                        <div className='çol-2'><label>End Time : </label></div>
                        <div className=' col-8'><input type='text' name='endTime' onChange={this.handleChange} value={dataSelected.endTime} className='form-control' /></div>
                    </div>
                    <div className='row'>
                        <div className='çol-2'><label>Class Status : </label></div>
                        <div className=' col-8'><input type='text' name='status' onChange={this.handleChange} value={dataSelected.status} className='form-control' /></div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancel</Button>
                    <Button onClick={handleModalSave(dataSelected)} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        );
    }

}

export default ModalDataChange