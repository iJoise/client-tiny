import React, { FC } from 'react';
import { Col, Layout, Row, Typography } from 'antd';
import { HomeHero } from './components/HomeHero';
import { Link, useNavigate } from 'react-router-dom';
import { HomeListings } from './components/HomeListings/HomeListings';
import { HomeListingsSkeleton } from './components/HomeListingsSkeleton';
import { useQuery } from '@apollo/client';
import {
  Listings as ListingsData,
  ListingsVariables,
} from '../../lib/graphql/query/Listings/__generated__/Listings';
import { LISTINGS } from '../../lib/graphql/query/Listings';
import { ListingsFilter } from '../../lib/graphql/globalTypes';
import { displayErrorMessage } from '../../lib/components/utils';

import cancunImage from '../../assets/home/cancun.jpg';
import sanFransiscoImage from '../../assets/home/san-fransisco.jpg';

const { Content } = Layout;
const { Paragraph, Title } = Typography;

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home: FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
    variables: {
      filter: ListingsFilter.PRICE_HIGH_TO_LOW,
      limit: PAGE_LIMIT,
      page: PAGE_NUMBER,
    },
  });

  const onSearch = (value: string) => {
    const trimmedValue = value.trim().toLocaleLowerCase();
    if (trimmedValue) {
      navigate(`/listings/${trimmedValue}`);
    } else {
      displayErrorMessage('Please enter a valid search!');
    }
  };

  const renderListingsSection = () => {
    if (loading) return <HomeListingsSkeleton />;
    if (data)
      return <HomeListings title="Premium Listings" listings={data.listings.result} />;
    return null;
  };

  return (
    <Content className="home">
      <HomeHero onSearch={onSearch} />

      <div className="home__cta-section">
        <Title level={2} className="home__cta-section-title">
          Your guide for all things rental
        </Title>
        <Paragraph>
          Helping you make the best decisions in renting your last minute locations
        </Paragraph>
        <Link
          to="/listings/united%20states"
          className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button"
        >
          Popular listings in the United States
        </Link>
      </div>

      {renderListingsSection()}

      <div className="home__listings">
        <Title level={4} className="home__listings-title">
          Listings of any kind
        </Title>
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Link to="/listings/san%20fransisco">
              <div className="home__listings-img-cover">
                <img
                  src={sanFransiscoImage}
                  alt="San Fransisco"
                  className="home__listings-img"
                />
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={12}>
            <Link to="/listings/canc??n">
              <div className="home__listings-img-cover">
                <img src={cancunImage} alt="Canc??n" className="home__listings-img" />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    </Content>
  );
};
