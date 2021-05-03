import React from 'react';
import Link from 'next/link';
import styles from '../pageStyles/login.module.scss';

const Login = (props) => (
  <div className={styles.loginMain}>
    <h1>Login</h1>
    <div className={styles.loginOptions}>
      <Link href="/player"><a className={styles.loginLink}>Player</a></Link>
      <Link href="/api/auth/signin"><a className={styles.loginLink}>Host</a></Link>
    </div>
  </div>
);

export default Login;
