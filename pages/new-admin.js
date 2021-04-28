import React, { useState } from 'react';
import { useRouter } from 'next/router';

const inviteRequired = true;

const NewAdminPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  console.log(router.query.invite);

  const createUser = (e) => {
    e.preventDefault();
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
    <div>
      <h1>New Admin</h1>
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
      </form>
    </div>
  );
};

export default NewAdminPage;
