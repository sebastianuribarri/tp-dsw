import { FC } from "react";
import styled from "styled-components";
import Event from "../../../types/Event";
import Team from "../../../types/Team";
import Section from "../../../ui-components/Section";

interface MatchEventsProps {
  events: Event[];
  homeTeam: Team;
  awayTeam: Team;
}

const TeamsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  gap: 25px;
`;

const TeamInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TeamLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const TeamName = styled.span`
  font-weight: bold;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
`;

const EventItem = styled.div<{ isHomeTeam: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const EventTime = styled.span`
  min-width: 40px;
  font-weight: bold;
  margin-right: 10px;
`;

const EventInfo = styled.span`
  flex: 1;
`;

const MatchEvents: FC<MatchEventsProps> = ({ events, homeTeam, awayTeam }) => {
  const sortedEvents = events.sort((a, b) => b.time - a.time);

  return (
    <Section title="Eventos">
      <TeamsContainer>
        <TeamInfo>
          <TeamLogo src={homeTeam.logo} alt={homeTeam.name} />
          <TeamName>{homeTeam.name}</TeamName>
        </TeamInfo>
        <TeamInfo>
          <TeamName>{awayTeam.name}</TeamName>
          <TeamLogo src={awayTeam.logo} alt={awayTeam.name} />
        </TeamInfo>
      </TeamsContainer>

      <EventsGrid>
        {sortedEvents.map((event, index) => (
          <EventItem
            key={index}
            isHomeTeam={event.team.id === homeTeam.id}
            style={{
              gridColumn: event.team.id === homeTeam.id ? 1 : 2,
              gridRow: index + 1,
            }}
          >
            <EventTime>{event.time}'</EventTime>
            <EventInfo>
              {event.type} - {event.player.name}
            </EventInfo>
          </EventItem>
        ))}
      </EventsGrid>
    </Section>
  );
};

export default MatchEvents;
