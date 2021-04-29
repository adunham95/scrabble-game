import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  signIn, signOut, useSession, getSession,
} from 'next-auth/client';
import { gql } from '@apollo/client';
import { initializeApollo } from '../../utilities/apollo_client/client';
import GameBlock, { NewGameBlock } from '../../components/Dashboard/GameBlock';
import { ToggleContent } from '../../components/Modal/modal';
import { FormModal } from '../../components/Form/FormModal';
import GameForm from '../../components/Dashboard/GameEditor';

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
    tiles: ['A', 'B', 'C', 'X', 'Y', 'Q'],
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c50',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
    tiles: ['Y', 'L', 'P', 'U'],
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c51',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c52',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c53',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
  },
];

const Dashboard = ({ session, games }) => {
  const [modalID, setModalID] = useState('');

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
            <NewGameBlock onClick={() => setModalID('new')} />
            {testGameData.map((g) => (
              <GameBlock
                key={g._id}
                title={g.name}
                color={g.color}
                tiles={g.tiles}
                onEdit={() => setModalID(g._id)}
              />
            ))}
          </div>
          <ToggleContent
            isOpen={modalID !== ''}
            toggle={(show) => <></>}
            content={(hide) => (
              <FormModal close={() => { setModalID(''); hide(); }}>
                <GameForm onCancel={() => { setModalID(''); hide(); }} />
                {/* {
                  modalID === 'new' ? <h1>New</h1> : <h1>Update</h1>
                }

                <button onClick={() => { setModalID(''); hide(); }}>Close</button> */}
              </FormModal>
            )}
          />
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
