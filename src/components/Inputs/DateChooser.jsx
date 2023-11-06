import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DateChooser({
  selectedDate,
  onDateChange,
  label,
  ...otherProps
}) {
  const handleDateChange = (date) => {
    if (onDateChange) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      onDateChange(formattedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} {...otherProps}>
      <DatePicker
        defaultValue={dayjs(selectedDate)}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}
