import {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatetimePicker = ({setTime, currentEvent}) => {
    const [startDate, setDate] = useState(new Date(currentEvent.event_datetime) || new Date());

    function setEventDate(date) {
        let dateJSON = date.toJSON()
        setDate(date)
        setTime({...currentEvent, event_datetime: dateJSON})
    }

    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setEventDate(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy HH:mm"
            showTimeInput
        />);
};
export default DatetimePicker
