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
    tiles{
      _id
      point
      letter
      weight
    }
  }
}
`;

const Dashboard = ({ session, games = [] }) => {
  const [modalID, setModalID] = useState('');
  const [gameSet, setGameSet] = useState(games);

  console.log('games', games);
  console.log(session);

  const saveGame = (project) => {
    console.log('saveGame', project);
    const allGames = [...gameSet, project];
    setGameSet(allGames);
    setModalID('');
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
            {gameSet.map((g) => (
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
                  adminID={session.user._id}
                  project={games.filter((p) => p._id === modalID)[0]}
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
