import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { getApolloMessage } from '../../utilities/apollo_client/client';
import styles from '../../pageStyles/admin.module.scss';

const inviteRequired = true;

const SignUpMutation = gql`
mutation($admin:AdminInput){
  createAdmin(admin:$admin){
    _id
    email
  }
}
`;

const NewAdminPage = () => {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [createAdmin] = useMutation(SignUpMutation);
  const router = useRouter();

  const createUser = async (e) => {
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
      const { data } = await createAdmin({
        variables: {
          admin: {
            email,
            password,
            invite: router.query.invite,
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

  if (inviteRequired && typeof router.query.invite === 'undefined') {
    console.log('no invite key');
    return (
      <div>
        <h1>You Need An Invite Key</h1>
      </div>
    );
  }

  return (
    <div className={styles.center}>
      <div className={styles.adminBox}>
        <div className={styles.tileContainer}>
          <div className={styles.tile}>
            <span className={styles.tileLetter}>A</span>
            <span className={styles.tileScore}>7</span>
          </div>
        </div>
        <h1 className={styles.headline}>New Admin</h1>
        <form onSubmit={(e) => createUser(e)}>
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

export default NewAdminPage;
