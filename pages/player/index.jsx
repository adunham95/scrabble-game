import React, { useState } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import cookieCutter from 'cookie-cutter';
import { capitalize } from '../../api/utilites/utilities';
import { Icon } from '../../components/Icons/Icon';
import Loader from '../../components/Loader/loader';
import { getApolloMessage } from '../../utilities/apollo_client/client';
import { Message } from '../../components/Text/Message';

const avatars = ['dog', 'cat', 'dragon', 'elephant', 'horse', 'squirrel', 'turtle', 'unicorn', 'whale'];
const colors = [
  { name: 'Red', color: '#f44336' },
  { name: 'Pink', color: '#E91E63' },
  { name: 'Purple', color: '#673ab7' },
  { name: 'Blue', color: '#0085ca' },
  { name: 'Teal', color: '#00796B' },
  { name: 'Green', color: '#009688' },
  { name: 'Yellow', color: '#f1dd2f' },
  { name: 'Orange', color: '#FF8201' },
  { name: 'Brown', color: '#5D4037' },
  { name: 'Smokey', color: '#58595C' },
];

const LogInMutation = gql`
mutation($password:String!,$player:PlayerInput!){
  loginGame(password:$password, player:$player){
    name
    _id
    playerID
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
  const [message, setMessage] = useState({ type: '', message: '' });

  const login = async () => {
    setIsLoading(true);
    setMessage({ type: '', message: '' });
    if (password === '') {
      setMessage({ type: 'error', message: 'Password Is Empty' });
      setIsLoading(false);
      return;
    }
    try {
      await client.resetStore();
      const { data } = await loginGame({
        variables: {
          password,
          player: {
            color: selectedColor,
            icon: selectedAvatar,
          },
        },
      });
      console.log(data);
      setIsLoading(false);
      setMessage({ type: 'success', message: 'Going to game' });
      cookieCutter.set('playerID', data.loginGame.playerID);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setMessage({ type: 'error', message: getApolloMessage(error) });
    }
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
      <div>
        <Message
          type={message.type}
          text={message.message}
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

export default Index;
