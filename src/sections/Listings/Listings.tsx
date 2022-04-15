import React from 'react';
import { useParams } from 'react-router-dom';

export const Listings = () => {
  const { location } = useParams<{location: string}>();
  return (
    <div className="listings">
      {location}
    </div>
  );
};
