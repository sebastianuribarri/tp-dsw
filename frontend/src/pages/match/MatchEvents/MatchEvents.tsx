import { FC } from "react";
import Event from "../../../types/Event";

interface MatchEventsProps {
  events: Event[];
}

const MatchEvents: FC<MatchEventsProps> = ({ events }) => (
  <div>
    <h3>Eventos</h3>
    <ul>
      {events.map((event, index) => (
        <li key={index}>
          {event.type} - {event.player.name} - {event.team.name}
        </li>
      ))}
    </ul>
  </div>
);

export default MatchEvents;
