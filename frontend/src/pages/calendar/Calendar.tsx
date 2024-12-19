import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { getUserById } from "../../api/user";
import { User } from "../../types/User";
import { getCalendar } from "../../api/match";
import Match from "../../types/Match";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        const userId = sessionStorage.getItem("userId");
        // Obtener los teamIds del usuario
        if (userId) {
          const response = await getUserById(userId);
          const user = response.data as User;
          const teamIds = user.teams;

          // Obtener el mes actualmente seleccionado
          const currentMonth = new Date().getMonth() + 1;

          // Obtener los datos del calendario
          const calendar_response = await getCalendar(currentMonth, teamIds);
          const matches = calendar_response.data as Match[];
          // Convertir los partidos en eventos para el calendario
          const formattedEvents = matches.map((match) => {
            const startDate = new Date(match.date);
            const endDate = new Date(match.date);
            endDate.setMinutes(startDate.getMinutes() + 110); // Sumar 110 minutos

            return {
              id: match.id,
              title: `${match.home.name} vs ${match.away.name}`,
              start: startDate,
              end: endDate,
              allDay: false,
            };
          });

          setEvents(formattedEvents);
          setError(null);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ height: "80vh", margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        views={["month"]}
        onNavigate={(date) => {
          const selectedMonth = date.getMonth() + 1;
          console.log("Mes seleccionado:", selectedMonth);
        }}
      />
    </div>
  );
};

export default CalendarView;
