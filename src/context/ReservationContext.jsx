import React, { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  const addReservation = (res) => setReservations([...reservations, res]);
  const removeReservation = (id) => setReservations(reservations.filter(r => r.id !== id));

  return (
    <ReservationContext.Provider value={{ reservations, addReservation, removeReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservations = () => useContext(ReservationContext);