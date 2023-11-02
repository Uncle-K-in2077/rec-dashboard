import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateChooser({
  selectedDate,
  onDateChange,
  label,
  ...otherProps
}) {
  const handleDateChange = (date) => {
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} {...otherProps}>
      <DatePicker
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}
