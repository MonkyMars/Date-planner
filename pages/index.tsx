import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import styles from "../styles/Home.module.scss";
import DateIdeaPopup from '../components/DateIdeaPopUp';

const Home: NextPage = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [calendar, setCalendar] = React.useState<Calendar | null>(null); // State to hold calendar instance

  useEffect(() => {
    if (calendarRef.current) {
      const newCalendar = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }
      });
      newCalendar.render();
      setCalendar(newCalendar); // Save calendar instance
    }
  }, []);

  const handleAddEvents = (dateIdeas: string[]) => {
    if (calendar) {
      dateIdeas.forEach((idea) => {
        calendar.addEvent({
          title: idea,
          start: new Date(),
          allDay: true
        });
      });
    }
    setVisible(false);
  };

  return (
    <>
      <Head>
        <title>{'Date Planner'}</title>
      </Head>
      <main className={styles.main}>
        <div ref={calendarRef} id="calendar" className={styles.calendar}></div>
        <button onClick={() => setVisible(!visible)}>{'Add Date'}</button>
      </main>
      {visible && <DateIdeaPopup setVisible={setVisible} onAddEvents={handleAddEvents} />}
    </>
  );
};

export default Home;
