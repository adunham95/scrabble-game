import { ApolloProvider } from '@apollo/client';
import '../styles.scss';
import { useApollo } from '../utilities/apollo_client/client';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <div id="modal-root" />
    </ApolloProvider>
  );
}

export default MyApp;
