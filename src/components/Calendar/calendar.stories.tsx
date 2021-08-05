import React from "react";
import Calendar from './index';

export default {
  title: "@Components/Calendar",
  component: Calendar,
  parameters: {}
};

export const DefaultCalendar = () => {
  return (
    <div style={{width: 370}}>
      <Calendar
        needInit={false}
        value={1623064004478}
        onChange={(dateString) => {}} />
    </div>
  )
};


