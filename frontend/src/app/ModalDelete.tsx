import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export interface ModalDeleteProps {
  open: boolean;
  onClose: (confirmed: boolean) => void;
}

export function ModalDelete({ open, onClose }: ModalDeleteProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>Elimina evento</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sei sicuro di voler eliminare questo evento?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(true)}>Conferma</Button>
        <Button onClick={() => onClose(false)}>Annulla</Button>
      </DialogActions>
    </Dialog>
  );
}
