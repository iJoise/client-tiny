import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LISTING } from '../../lib/graphql/query/Listing';
import {
  Listing as ListingData,
  ListingVariables,
} from '../../lib/graphql/query/Listing/__generated__/Listing';
import { useParams } from 'react-router-dom';
import { Layout, Col, Row } from 'antd';
import { ErrorBanner, PageSkeleton } from '../../lib/components';
import { ListingDetails } from './components/ListingDetails';

const PAGE_LIMIT = 3;
const { Content } = Layout;

export const Listing = () => {
  const { id } = useParams<{ id: string }>();
  const [bookingsPage, setBookingsPage] = useState(1);

  const { data, loading, error } = useQuery<ListingData, ListingVariables>(LISTING, {
    variables: {
      id: id || '',
      bookingsPage,
      limit: PAGE_LIMIT,
    },
  });

  if (loading) {
    return (
      <Content className="listing">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="listing">
        <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon!" />
        <PageSkeleton />
      </Content>
    );
  }

  const listing = data ? data.listing : null;
  const listingBookings = listing ? listing.bookings : null;

  const listingDetailsElement = listing ? <ListingDetails listing={listing} /> : null;

  return (
    <Content className='listings'>
      <Row gutter={24} justify='space-between'>
        <Col xs={24} lg={14}>
          {listingDetailsElement}
        </Col>
      </Row>
    </Content>
  );
};
