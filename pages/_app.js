import { ApolloProvider } from '@apollo/client';
import '../styles.scss';
import { Provider } from 'next-auth/client';
import { useApollo } from '../utilities/apollo_client/client';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
        <div id="modal-root" />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
