import { useEffect, useState } from 'react';

const useCountDown = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  const startCountDown = (seconds: number) => {
    setSecondsLeft(seconds);
  };

  return { secondsLeft, startCountDown };
};

export default useCountDown;
