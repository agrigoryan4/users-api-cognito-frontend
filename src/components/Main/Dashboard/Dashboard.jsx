import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// aws
import { Auth } from 'aws-amplify';
//

function Dashboard() {
  const history = useHistory();

  const [state, setState] = useState({
    signIn: false,
    user: {
      name: null,
      nickname: null,
      username: null,
      favouriteAnimal: null,
      email: null,
      emailVerified: null,
    },
  });

  useEffect(async () => {
    try {
      const result = await Auth.currentUserInfo();
      console.log(result);
      if (!result?.username) {
        history.push('/signin');
        return;
      }
      const {
        username, attributes: {
          'custom:favourite_animal': favouriteAnimal, email, email_verified: emailVerified, name, nickname,
        },
      } = result;
      setState({
        ...state,
        signIn: true,
        user: {
          ...state.user,
          name,
          nickname,
          username,
          favouriteAnimal,
          email,
          emailVerified,
        },
      });
    } catch (error) {
      console.log(error);
      history.push('/signin');
    }
  }, []);

  const {
    signIn,
    user: {
      name, nickname, username, favouriteAnimal, email, emailVerified,
    },
  } = state;
  return (
    <div>
      <h1>Dashboard</h1>
      {signIn && (
        <>
          <h2>User</h2>
          <h3>
            Name:
            {name}
          </h3>
          <h3>
            Nickname:
            {nickname}
          </h3>
          <h3>
            Username:
            {username}
          </h3>
          <h3>
            Favourite Animal:
            {favouriteAnimal}
          </h3>
          <h3>
            Email:
            {email}
            {' '}
            (
            <i>{emailVerified ? 'verified' : 'not verified'}</i>
            )
          </h3>
        </>
      )}
    </div>
  );
}

export default Dashboard;
