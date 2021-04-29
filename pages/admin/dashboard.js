import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  signIn, signOut, useSession, getSession,
} from 'next-auth/client';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../utilities/apollo_client/client';
import GameBlock, { NewGameBlock } from '../../components/Dashboard/GameBlock';

const FetchGamesQuery = gql`
  query($adminID:String!){
    getGamesByAdmin(adminID:$adminID){
      _id
      adminID
      name
      password
    }
  }
`;

const testGameData = [
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#ffcf58',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 3',
    password: '',
    color: '#6970fc',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#ffcf58',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#6970fc',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#ffcf58',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#6970fc',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#ffcf58',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#6970fc',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#ffcf58',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#6970fc',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#ffcf58',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c49',
    name: 'Test Quiz 2',
    password: '',
    color: '#6970fc',
  },
];

const Dashboard = ({ session, games }) => {
  const [data, setStat] = useState('');

  // console.log(session);

  return (
    <>
      {!session && (
        <>
          Not signed in
          {' '}
          <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as
          {' '}
          {session.user.email}
          {' '}
          {session.user._id}
          <br />
          <button onClick={signOut}>Sign out</button>
          <div style={{ display: 'flex', flexWrap: 'wrap', background: '#e8e8e8' }}>
            <NewGameBlock />
            {testGameData.map((g) => (
              <GameBlock
                key={g._id}
                title={g.name}
                color={g.color}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  // TODO set to only work when logged in

  const apolloClient = initializeApollo();
  const session = await getSession(context);
  console.log(session);
  const { data } = await apolloClient.query({
    query: FetchGamesQuery,
    variables: { adminID: session.user._id ?? '' },
  });

  console.log(data);

  return {
    props: {
      session,
      games: data.getGamesByAdmin,
    },
  };
}

export default Dashboard;
