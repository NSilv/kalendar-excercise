import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
export interface NewEvent {
  description: string;
  duration: number;
}
export interface ModalNewEventProps {
  open: boolean;
  onClose: (data: NewEvent | null) => void;
}
export function ModalNewEvent({ open, onClose }: ModalNewEventProps) {
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
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crea nuovo evento</DialogTitle>
      <TextField
        type="text"
        label="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        type="number"
        label="duration"
        value={duration > 0 ? duration.toString() : ""}
        onChange={(e) => setDuration(parseInt(e.target.value))}
      />
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
