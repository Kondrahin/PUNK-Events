import {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatetimePicker = ({setTime, currentEvent}) => {
    const [startDate, setDate] = useState(new Date());

    function setEventDate(date) {
        // console.log(date)
        // console.log()
        let dateJSON = date.toJSON()
        setDate(date)
        console.log(startDate)
        setTime({...currentEvent, event_datetime: dateJSON})
    }

    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setEventDate(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
        />
    );
};
export default DatetimePicker