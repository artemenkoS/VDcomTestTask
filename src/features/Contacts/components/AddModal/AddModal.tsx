import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export function AddModal(props: Props) {
  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add new contact </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">This function is under construction</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Disagree</Button>
          <Button onClick={props.onClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
