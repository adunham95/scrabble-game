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
    tiles: [{
      _id: '0001', letter: 'A', point: 1, weight: 9,
    }, {
      _id: '002', letter: 'B', point: 3, weight: 2,
    }, {
      _id: '003', letter: 'C', point: 3, weight: 2,
    }, {
      _id: '004', letter: 'X', point: 8, weight: 1,
    }, {
      _id: '005', letter: 'Y', point: 4, weight: 2,
    }, {
      _id: '006', letter: 'Q', point: 10, weight: 1,
    }, {
      _id: '007', letter: 'S', point: 10, weight: 1,
    }, {
      _id: '008', letter: 'T', point: 10, weight: 1,
    }, {
      _id: '009', letter: 'V', point: 10, weight: 1,
    }, {
      _id: '010', letter: 'H', point: 10, weight: 1,
    }, {
      _id: '011', letter: 'M', point: 10, weight: 1,
    }],
    rounds: 12,
  },
  {
    __typename: 'Game',
    _id: '6089455e91100139f4d52c50',
    name: 'Test Quiz 1',
    password: '',
    color: '#00a084',
    tiles: [{
      _id: '05', letter: 'Y', point: 4, weight: 2,
    }, {
      _id: '01', letter: 'L', point: 1, weight: 4,
    }, {
      _id: '02', letter: 'P', point: 3, weight: 2,
    }, {
      _id: '03', letter: 'U', point: 1, weight: 4,
    }],
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

  console.log(session);

  const saveGame = (project) => {
    console.log('saveGame', project);
  };

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
          <button onClick={signOut}>Sign out</button>
          <h1 style={{ padding: '20px' }}>
            Hello
            {' '}
            {session.user.firstName}
          </h1>
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
                <GameForm
                  project={testGameData.filter((p) => p._id === modalID)[0]}
                  onCancel={() => { setModalID(''); hide(); }}
                  onSubmit={(g) => saveGame(g)}
                />
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
