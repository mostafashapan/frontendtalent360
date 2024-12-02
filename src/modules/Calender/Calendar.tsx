import React from 'react';

const Calendar: React.FC = () => {
  return (
    <div className="calendar-container">
      <h1 className="text-3xl font-bold text-center mb-4">My Calendar</h1>

      {/* Embed the calendar as an iframe */}
      <iframe
        src="https://react-tailwind-calendar-rose.vercel.app/"
        title="React Tailwind Calendar"
        width="100%"
        height="600"
        frameBorder="0"
        className="border-0 rounded-lg"
      />
    </div>
  );
};

export default Calendar;
