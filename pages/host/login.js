import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/client';
import { getApolloMessage } from '../../utilities/apollo_client/client';
import styles from '../../pageStyles/host.module.scss';
import FakeTile from '../../components/Tile/tileFake';

const LoginMutation = gql`
mutation($host:HostInput){
  loginHost(host:$hose){
    _id
    email
  }
}
`;

const Login = () => {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [loginHost] = useMutation(LoginMutation);

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', message: '' });
    if (password === '') {
      setMessage({ type: 'error', message: 'Password Is Empty' });
      setIsLoading(false);
      return;
    }
    signIn('credentials', { email, password, callbackUrl: '/host/dashboard' });
    // try {
    //   await client.resetStore();
    //   const { data } = await loginHost({
    //     variables: {
    //       host: {
    //         email,
    //         password,
    //       },
    //     },
    //   });
    //   console.log(data);
    //   setIsLoading(false);
    //   setMessage({ type: 'success', message: 'Logging In' });
    // } catch (error) {
    //   console.log(error);
    //   setIsLoading(false);
    //   setMessage({ type: 'error', message: getApolloMessage(error) });
    // }
  };

  return (
    <div className={styles.center}>
      <div className={styles.hostBox}>
        {/* <div className={styles.tileContainer}>
          <div className={styles.tile}>
            <span className={styles.tileLetter}>A</span>
            <span className={styles.tileScore}>7</span>
          </div>
        </div> */}
        {/* <h1 className={styles.headline}>Login</h1> */}
        <div className={styles.row}>
          <FakeTile letter="L" />
          <FakeTile
            letter="O"
            number="6"
          />
          <FakeTile
            letter="G"
            number="5"
          />
          <FakeTile
            letter="I"
            number="9"
          />
          <FakeTile
            letter="N"
            number="1"
          />
        </div>
        <form onSubmit={(e) => login(e)}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>
            Create User
          </button>
          <p className={`alert-${message.type}`}>
            {message.message}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
