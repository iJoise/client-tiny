import React from 'react';
import { useParams } from 'react-router-dom';

export const User = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      User
      {JSON.stringify(id)}
    </div>
  );
};
