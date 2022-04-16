import React from 'react';
import { Listings } from '../../../../lib/graphql/query/Listings/__generated__/Listings';
import { List, Typography } from 'antd';
import { ListingCard } from '../../../../lib/components';

interface HomeListingsProps {
  title: string;
  listings: Listings['listings']['result'];
}

const { Title } = Typography;

export const HomeListings = ({ listings, title }: HomeListingsProps) => {
  return (
    <div>
      <Title level={4} className="home-listings__title">
        {title}
      </Title>
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={listings}
        renderItem={listing => (
          <List.Item>
            <ListingCard listing={listing} />
          </List.Item>
        )}
      />
    </div>
  );
};
