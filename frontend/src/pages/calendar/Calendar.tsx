import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addMonths,
  subMonths,
  startOfMonth,
} from "date-fns";
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
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfMonth(new Date())
  ); // Primer día del mes actual

  const fetchCalendarData = async (date: Date) => {
    try {
      setLoading(true);
      const userId = sessionStorage.getItem("userId");

      if (userId) {
        const response = await getUserById(userId);
        const user = response.data as User;
        const teamIds = user.teams.map((team) => team.id);

        const month = date.getMonth() + 1;
        const calendar_response = await getCalendar(month, teamIds);
        const matches = calendar_response.data as Match[];

        const formattedEvents = matches.map((match) => {
          const startDate = new Date(match.date);
          const endDate = new Date(match.date);
          endDate.setMinutes(startDate.getMinutes() + 110); // Sumar 110 minutos

          return {
            id: match.id,
            title: `${match.home.name} vs ${match.away.name}`,
            start: startDate,
            end: endDate,
            allDay: true,
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

  useEffect(() => {
    fetchCalendarData(selectedDate);
  }, [selectedDate]);

  const handlePreviousMonth = () => {
    setSelectedDate((prevDate) => startOfMonth(subMonths(prevDate, 1)));
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => startOfMonth(addMonths(prevDate, 1)));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ height: "80vh", margin: "20px" }}>
      {/* Botones personalizados para navegar entre meses */}
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <button onClick={handlePreviousMonth} style={{ marginRight: "10px" }}>
          Anterior
        </button>
        <span>{format(selectedDate, "MMMM yyyy", { locale: enUS })}</span>
        <button onClick={handleNextMonth} style={{ marginLeft: "10px" }}>
          Siguiente
        </button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        views={["month"]}
        date={selectedDate} // Fijar la fecha actual del calendario
        onNavigate={() => {}} // Deshabilitar navegación interna
      />
    </div>
  );
};

export default CalendarView;
