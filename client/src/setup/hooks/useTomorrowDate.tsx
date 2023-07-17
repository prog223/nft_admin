import { useEffect, useState } from 'react';

const useTomorrowDate = (): Date => {
  const [tomorrowDate, setTomorrowDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      setTomorrowDate(date);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return tomorrowDate;
};

export default useTomorrowDate;