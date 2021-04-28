import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { initializeApollo } from '../../utilities/apollo_client/client';

const Dashboard = () => {
  const [data, setStat] = useState('');
  const router = useRouter();
  //   console.log(router.query);
  return (
    <div />
  );
};

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  console.log(params);
  const { accountid } = params;
  // console.log(slug);
  // const { data } = await apolloClient.query({
  //   query: FetchSingleSnippet,
  //   variables: { slug },
  // });

  return {
    props: {
      // data,
      // slug,
    },
  };
}

export default Dashboard;
