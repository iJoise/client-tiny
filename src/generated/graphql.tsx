import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Booking = {
  __typename?: 'Booking';
  checkIn: Scalars['String'];
  checkOut: Scalars['String'];
  id: Scalars['ID'];
  listing: Listing;
  tenant: User;
};

export type Bookings = {
  __typename?: 'Bookings';
  result: Array<Booking>;
  total: Scalars['Int'];
};

export type Listing = {
  __typename?: 'Listing';
  address: Scalars['String'];
  bookings?: Maybe<Bookings>;
  bookingsIndex: Scalars['String'];
  city: Scalars['String'];
  description: Scalars['String'];
  host: User;
  id: Scalars['ID'];
  image: Scalars['String'];
  numOfGuests: Scalars['Int'];
  price: Scalars['Int'];
  title: Scalars['String'];
  type: ListingType;
};


export type ListingBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE'
}

export type Listings = {
  __typename?: 'Listings';
  result: Array<Listing>;
  total: Scalars['Int'];
};

export enum ListingsFilter {
  PriceHighToLow = 'PRICE_HIGH_TO_LOW',
  PriceLowToHigh = 'PRICE_LOW_TO_HIGH'
}

export type LogInInput = {
  code: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logIn: Viewer;
  logOut: Viewer;
};


export type MutationLogInArgs = {
  input?: InputMaybe<LogInInput>;
};

export type Query = {
  __typename?: 'Query';
  authUrl: Scalars['String'];
  listing: Listing;
  listings: Listings;
  user: User;
};


export type QueryListingArgs = {
  id: Scalars['ID'];
};


export type QueryListingsArgs = {
  filter: ListingsFilter;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  bookings?: Maybe<Bookings>;
  contact: Scalars['String'];
  hasWallet: Scalars['Boolean'];
  id: Scalars['ID'];
  income?: Maybe<Scalars['Int']>;
  listings: Listings;
  name: Scalars['String'];
};


export type UserBookingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type UserListingsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type Viewer = {
  __typename?: 'Viewer';
  avatar?: Maybe<Scalars['String']>;
  didRequest: Scalars['Boolean'];
  hasWallet?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  token?: Maybe<Scalars['String']>;
};

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
  bookingsPage: Scalars['Int'];
  listingsPage: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean, income?: number | null, contact: string, bookings?: { __typename?: 'Bookings', total: number, result: Array<{ __typename?: 'Booking', id: string, checkIn: string, checkOut: string, listing: { __typename?: 'Listing', id: string, title: string, image: string, address: string, price: number, numOfGuests: number } }> } | null, listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, image: string, address: string, price: number, numOfGuests: number }> } } };


export const UserDocument = gql`
    query User($id: ID!, $bookingsPage: Int!, $listingsPage: Int!, $limit: Int!) {
  user(id: $id) {
    id
    name
    avatar
    hasWallet
    income
    contact
    bookings(limit: $limit, page: $bookingsPage) {
      total
      result {
        id
        listing {
          id
          title
          image
          address
          price
          numOfGuests
        }
        checkIn
        checkOut
      }
    }
    listings(limit: $limit, page: $listingsPage) {
      total
      result {
        id
        title
        image
        address
        price
        numOfGuests
      }
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      bookingsPage: // value for 'bookingsPage'
 *      listingsPage: // value for 'listingsPage'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;