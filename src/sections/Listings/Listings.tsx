import React, { FC } from 'react';
import { server } from '../../lib/api';
import { DeleteListingData, DeleteListingVariables, ListingsData } from './types';

type ListingPropsType = {
  title: string;
};

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

export const Listing: FC<ListingPropsType> = ({ title }) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id: "6248aa62d3cd9e7d67bd4106",
      },
    });

    console.log(data);
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
      <button onClick={deleteListing}>Delete Listings</button>
    </div>
  );
};
