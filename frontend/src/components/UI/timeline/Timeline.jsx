import {VerticalTimeline, VerticalTimelineElement,} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {FcCalendar} from "react-icons/all";
import MyButton from "../button/MyButton";
import {useNavigate} from 'react-router-dom';


const Timeline = ({usersEvents}) => {
    const navigate = useNavigate();

    const redirect = (uuid) => {
        navigate('/events/' + uuid)
    }

    function getEvents() {
        let eventsList = []
        Object.keys(usersEvents).forEach(function (key) {
            let event_datetime = new Date(usersEvents[key].event_datetime)
            eventsList.push(
                <VerticalTimelineElement
                    key={usersEvents[key].uuid}
                    className="vertical-timeline-element--work"
                    contentStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                    contentArrowStyle={{borderRight: '7px solid  rgb(33, 150, 243)'}}
                    date={event_datetime.toLocaleDateString() + " " + event_datetime.toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                    iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                    icon={<FcCalendar/>}
                >
                    <h3 className="vertical-timeline-element-title">{usersEvents[key].title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{usersEvents[key].description}</h4>
                    <p>
                        {usersEvents[key].scope}
                    </p>
                    <MyButton onClick={() => redirect(usersEvents[key].uuid)}>Открыть</MyButton>
                </VerticalTimelineElement>
            );
        });
        return eventsList
    }


    return (
        <VerticalTimeline>
            {getEvents()}
        </VerticalTimeline>
    );
};

export default Timeline;
