import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  signIn, signOut, useSession, getSession,
} from 'next-auth/client';
import { initializeApollo } from '../../utilities/apollo_client/client';

const Dashboard = () => {
  const [data, setStat] = useState('');
  const [session, loading] = useSession();
  const router = useRouter();
  //   console.log(router.query);
  if (loading) {
    return <p>Loading...</p>;
  }

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
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);

  return {
    props: {
      session,
    },
  };
}

export default Dashboard;
