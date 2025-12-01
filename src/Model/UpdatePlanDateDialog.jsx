import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";

const UpdatePlanDateDialog = ({
  open,
  type,
  company,
  selectedDate,
  setSelectedDate,
  onClose,
  onSave,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "5px",
          padding: "15px",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "medium", fontSize: "22px", pb: 2 }}>
        {type === "purchase_date" ? "Select Purchase Date" : "Select Expiry Date"}
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={type === "purchase_date" ? "Purchase Date" : "Expiry Date"}
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={(newValue) => {
              setSelectedDate(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "");
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
                sx: {
                  mt: 1,
                  "& .MuiInputBase-root": {
                    borderRadius: "10px",
                    height: 50,
                  },
                },
                helperText: "Date format: MM-DD-YYYY",
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </LocalizationProvider>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", pt: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{ textTransform: "none", borderRadius: "8px", minWidth: 90 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", borderRadius: "8px", minWidth: 90 }}
          onClick={() => {
            if (company) {
              const payload = {
                plan_id: company?.plan_id,
                status: 1,
                purchase_date:
                  type === "purchase_date"
                    ? dayjs(selectedDate).format("YYYY-MM-DD")
                    : dayjs(company?.purchase_date).format("YYYY-MM-DD"),
                expire_date:
                  type === "expire_date"
                    ? dayjs(selectedDate).format("YYYY-MM-DD")
                    : dayjs(company?.expire_date).format("YYYY-MM-DD"),
              };
              onSave(payload);
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePlanDateDialog;
