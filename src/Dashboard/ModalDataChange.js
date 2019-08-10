import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalDataChange = (props) => {
    let { open, onClose, dataSelected, handleChange } = props;
    console.log(dataSelected);
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    Please add your new modification
                    </DialogContentText>
                <div className='row'>
                    <div className='çol-2'><label>Class :</label></div>
                    <div className=' col-10'><input type='text' name='className' onChange={handleChange} value={dataSelected.className} className='form-control' /></div>
                </div>
                <div className='row'>
                    <div className='çol-2'><label>Date :</label></div>
                    <div className=' col-10'><input type='text' name='date' onChange={handleChange} value={dataSelected.date} className='form-control' /></div>
                </div>
                <div className='row'>
                    <div className='çol-sm-2'><label>Start Time : </label></div>
                    <div className=' col-sm-10'><input type='text' name='startTime' onChange={handleChange} value={dataSelected.startTime} className='form-control' /></div>
                </div>
                <div className='row'>
                    <div className='çol-sm-2'><label>End Time : </label></div>
                    <div className=' col-sm-10'><input type='text' name='endTime' onChange={handleChange} value={dataSelected.endTime} className='form-control' /></div>
                </div>
                <div className='row'>
                    <div className='çol-sm-2'><label>Class Status : </label></div>
                    <div className=' col-sm-10'><input type='text' name='status' onChange={handleChange} value={dataSelected.status} className='form-control' /></div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={onClose} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalDataChange