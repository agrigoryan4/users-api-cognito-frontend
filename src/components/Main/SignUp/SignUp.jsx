import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
// aws
import { Auth } from 'aws-amplify';
//
import classes from './SignUp.module.scss';

function SignUp() {
  const history = useHistory();
  const [state, setState] = useState({
    form: {
      name: '',
      nickname: '',
      favouriteAnimal: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    progress: {
      success: false,
      error: null,
    },
  });

  useEffect(() => {
    if (state.progress.success) {
      history.push('/signin');
    }
  }, [state.progress.success]);

  // FORM
  const onInputChange = (e) => {
    const { target: { name: inputName, value: inputValue } } = e;
    setState({
      ...state,
      form: {
        ...state.form,
        [inputName]: inputValue,
      },
    });
  };

  const onSignUp = async () => {
    const {
      form: {
        name, nickname, favouriteAnimal, email, password, repeatPassword,
      },
    } = state;
    if (password !== repeatPassword) {
      setState({
        ...state,
        progress: {
          ...state.progress,
          error: 'Password mismatch',
        },
      });
      return;
    }
    const params = {
      username: email,
      password,
      attributes: {
        nickname,
        email,
        name,
        'custom:favourite_animal': favouriteAnimal,
      },
      validationData: [],
    };
    try {
      const response = await Auth.signUp(params);
      console.log('Auth.signUp successfull, response ->');
      console.log(response);
      setState({
        ...state,
        progress: {
          ...state.progress,
          success: true,
        },
      });
      alert('Signup successfull, redirecting...');
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        progress: {
          ...state.progress,
          error: error.message || error,
        },
      });
    }
  };

  const {
    form: {
      name, nickname, favouriteAnimal, email, password, repeatPassword,
    },
    progress: { error, success },
  } = state;
  return (
    <div className={classes.wrapper}>
      <h2 style={{ color: 'red' }}>{error}</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={onInputChange} />
        </label>
        <label>
          Nickname:
          <input type="text" name="nickname" value={nickname} onChange={onInputChange} />
        </label>
        <label>
          Favourite Animal:
          <input type="text" name="favouriteAnimal" value={favouriteAnimal} onChange={onInputChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={email} onChange={onInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={onInputChange} />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="repeatPassword" value={repeatPassword} onChange={onInputChange} />
        </label>
        <button type="button" onClick={onSignUp}>Sign Up</button>
      </form>
      <br/>
      <br/>
      <h4>Already have an account? <Link to="/signin">Sign In</Link></h4>
    </div>
  );
}

export default SignUp;
