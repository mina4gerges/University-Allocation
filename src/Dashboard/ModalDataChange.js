import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalDataChange = (props) => {
    let { open, onClose, data } = props;
    console.log(data);
    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        Please add your new modification
                    </DialogContentText>
                    Date :<input type='text' autoFocus>{data.Date}</input><br />
                    Start Time :<input type='text'>{data.startTime}</input><br />
                    End Time :<input type='text'>{data.endTime}</input><br />
                    Class Status :<input type='text'>{data.status}</input><br />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancel</Button>
                    <Button onClick={onClose} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalDataChange