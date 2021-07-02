import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';// aws
import { Auth } from 'aws-amplify';
//
import classes from './SignIn.module.scss';

function SignIn() {
  const history = useHistory();
  const [state, setState] = useState({
    form: {
      email: '',
      password: '',
    },
    progress: {
      success: false,
      error: null,
    },
  });

  useEffect(() => {
    if (state.progress.success === true) {
      // redirect to main page
      history.push('/dashboard');
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

  const onSignIn = async () => {
    const {
      form: {
        email, password,
      },
    } = state;
    try {
      const response = await Auth.signIn(email, password);
      const {
        signInUserSession: {
          accessToken: { jwtToken: accessToken },
          idToken: { jwtToken: idToken },
          refreshToken: { jwtToken: refreshToken },
        },
      } = response;
      window.localStorage.setItem('access_token', accessToken);
      window.localStorage.setItem('id_token', idToken);
      window.localStorage.setItem('refresh_token', refreshToken);
      setState({
        ...state,
        progress: {
          ...state.progress,
          success: true,
        },
      });
    } catch (error) {
      let err = error.message || error;
      console.log(error);
      if (error.code === 'UserNotConfirmedException') {
        try {
          const result = await Auth.resendSignUp(email);
          console.log(result);
          history.push(`/confirmemail/${email}`);
        } catch (error) {
          console.log(error);
          err += `; ${error.message || error}`;
        }
      }
      setState({
        ...state,
        progress: {
          ...state.progress,
          error: err,
        },
      });
    }
  };

  const {
    form: {
      email, password,
    },
    progress: { error, success },
  } = state;
  return (
    <div className={classes.wrapper}>
      <h2 style={{ color: 'red' }}>{error}</h2>
      <form>
        <label>
          Email:
          <input type="text" name="email" value={email} onChange={onInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={onInputChange} />
        </label>
        <button type="button" onClick={onSignIn}>Sign In</button>
      </form>
      <br />
      <br />
      <h4>
        Forgot password?
        <Link to="/forgotpassword">Reset</Link>
      </h4>
      <h4>
        Don't have an account?
        <Link to="/signup">Sign Up</Link>
      </h4>
    </div>
  );
}

export default SignIn;
