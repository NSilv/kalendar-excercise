import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
export interface NewEvent {
  description: string;
  duration: number;
}
export interface ModalNewEventProps {
  date: Date | null;
  open: boolean;
  onClose: (data: NewEvent | null) => void;
}
export function ModalNewEvent({ open, onClose, date }: ModalNewEventProps) {
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  function handleClose() {
    onClose(null);
  }
  function handleConfirm() {
    onClose({
      description,
      duration,
    });
    setDescription("");
    setDuration(0);
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crea nuovo evento</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Evento creato per data: {date?.toLocaleString()}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          fullWidth
          variant="standard"
          type="text"
          label="Descrizione evento"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          id="duration"
          fullWidth
          variant="standard"
          type="number"
          label="Durata evento"
          value={duration > 0 ? duration.toString() : ""}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleClose}>
          Annulla
        </Button>
        <Button type="button" onClick={handleConfirm}>
          Salva
        </Button>
      </DialogActions>
    </Dialog>
  );
}
