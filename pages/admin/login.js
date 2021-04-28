import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { getApolloMessage } from '../../utilities/apollo_client/client';

const LoginMutation = gql`
mutation($admin:AdminInput){
  loginAdmin(admin:$admin){
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
  const [loginAdmin] = useMutation(LoginMutation);
  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', message: '' });
    if (password === '') {
      setMessage({ type: 'error', message: 'Password Is Empty' });
      setIsLoading(false);
      return;
    }
    try {
      await client.resetStore();
      const { data } = await loginAdmin({
        variables: {
          admin: {
            email,
            password,
          },
        },
      });
      console.log(data);
      setIsLoading(false);
      setMessage({ type: 'success', message: 'Logging In' });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setMessage({ type: 'error', message: getApolloMessage(error) });
    }
  };

  return (
    <div>
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
  );
};

export default Login;
