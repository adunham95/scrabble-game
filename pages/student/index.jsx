import React, { useState } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { capitalize } from '../../api/utilites/utilities';
import { Icon } from '../../components/Icons/Icon';
import { initializeApollo } from '../../utilities/apollo_client/client';
import Loader from '../../components/Loader/loader';

const avatars = ['dog', 'cat', 'dragon', 'elephant', 'horse', 'squirrel', 'turtle', 'unicorn', 'whale'];
const colors = [
  { name: 'Dark Red', color: '#A60C31' },
  { name: 'Red', color: '#f44336' },
  { name: 'Pink', color: '#E91E63' },
  { name: 'Purple', color: '#673ab7' },
  { name: 'Blue', color: '#0085ca' },
  { name: 'Teal', color: '#00796B' },
  { name: 'Green', color: '#009688' },
  { name: 'Lime', color: '#cddc39' },
  { name: 'Yellow', color: '#f1dd2f' },
  { name: 'Amber', color: '#ffc107' },
  { name: 'Orange', color: '#FF8201' },
  { name: 'Brown', color: '#5D4037' },
  { name: 'Smokey', color: '#58595C' },
];

const LogInMutation = gql`
mutation($password:String!,$student:StudentInput!){
  loginGame(password:$password, user:$student){
    name
    _id
    users{
      _id
      icon
      name
    }
  }
}
`;

const Index = () => {
  const client = useApolloClient();
  const [loginGame] = useMutation(LogInMutation);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [selectedColor, setSelectedColor] = useState(colors[colors.length - 1]);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    console.log('password', password);
    setIsLoading(true);
    // try {
    //   client.resetStore();
    // } catch {
    //   //
    // }
  };

  return (
    <div className="loginScreen">
      <div>
        <h1>Join Game</h1>
        {/* <h2>
          {capitalize(selectedColor.name)}
          {' '}
          {capitalize(selectedAvatar)}
        </h2> */}
      </div>
      <div className="main-icon">
        <Icon
          name={selectedAvatar}
          color={selectedColor.color}
          height={100}
          width={100}
        />
      </div>
      <div className="list-icons">
        {
            avatars.map((a) => (
              <button
                onClick={() => setSelectedAvatar(a)}
                className={`${a === selectedAvatar ? 'active' : ''}`}
                disabled={isLoading}
              >
                <Icon
                  name={a}
                  color="black"
                  height={40}
                  width={40}
                />
              </button>
            ))
        }
      </div>
      <div className="list-colors">
        {
            colors.map((c) => (
              <button
                onClick={() => setSelectedColor(c)}
                style={{ backgroundColor: c.color }}
                disabled={isLoading}
              >
                {capitalize(c.name)}
              </button>
            ))
        }
      </div>
      <div className="login">
        {/* <input placeholder="Enter Name" /> */}
        <input
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          disabled={isLoading}
        />
      </div>
      <div className="login">
        {
          isLoading ? <Loader />
            : <button onClick={login}>Login</button>
}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
