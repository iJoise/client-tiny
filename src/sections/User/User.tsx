import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER } from '../../lib/graphql/query/User';
import { Col, Layout, Row } from 'antd';
import {
  User as UserData,
  UserVariables,
} from '../../lib/graphql/query/User/__generated__/User';
import { UserProfile } from './components/UserProfile';
import { Viewer } from '../../lib/types';
import { ErrorBanner, PageSkeleton } from '../../lib/components';
import { UserListings } from './components/UserListings';
import { UserBookings } from './components/UserBookings';

const { Content } = Layout;

interface UserProps {
  viewer: Viewer;
}

const PAGE_LIMIT = 4;

export const User = ({ viewer }: UserProps) => {
  const { id } = useParams<{ id: string }>();
  const [listingsPage, setListingsPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: id || '',
      bookingsPage,
      listingsPage,
      limit: PAGE_LIMIT,
    },
  });

  const user = data ? data.user : null;
  const viewerIsUser = viewer.id === id;

  const usersListings = user ? user.listings : null;
  const userBookings = user ? user.bookings : null;
  const userProfileElement = user ? (
    <UserProfile user={user} viewerIsUser={viewerIsUser} />
  ) : null;

  const userListingsElement = usersListings ? (
    <UserListings
      userListings={usersListings}
      listingsPage={listingsPage}
      limit={PAGE_LIMIT}
      setListingsPage={setListingsPage}
    />
  ) : null;

  const userBookingsElement = userBookings ? (
    <UserBookings
      userBookings={userBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  ) : null;

  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon" />
        <PageSkeleton />
      </Content>
    );
  }

  return (
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24} >
          {userListingsElement}
          {userBookingsElement}
        </Col>
      </Row>
    </Content>
  );
};
