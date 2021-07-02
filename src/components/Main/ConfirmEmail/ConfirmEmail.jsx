import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// aws
import { Auth } from 'aws-amplify';
//
import classes from './ConfirmEmail.module.scss';

function ConfirmEmail() {
  const { email } = useParams();
  const history = useHistory();
  const [state, setState] = useState({
    form: {
      code: '',
    },
    progress: {
      success: false,
      error: null,
    },
  });

  useEffect(async () => {
    //
  }, []);

  useEffect(() => {
    if (state.progress.success === true) {
      alert('Email confirmed, redirecting to sign in page...');
      // redirect to sign in page
      history.push('/signin');
    }
  }, [state.progress.success]);

  // UTILS

  const getCurrentUserUsername = async () => {
    let username = email;
    if (!username) {
      ({ attributes: { email: username } } = await Auth.currentUserPoolUser());
    }
    return username;
  };

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

  const onConfirm = async () => {
    const {
      form: {
        code,
      },
    } = state;
    try {
      // getting current user
      const username = await getCurrentUserUsername();
      console.log(username, code);
      // confirming email
      const result = await Auth.confirmSignUp(username, code);
      console.log(result);
      setState({
        ...state,
        progress: {
          ...state.progress,
          success: true,
        },
      });
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

  const resendCode = async () => {
    try {
      // getting current user
      const username = getCurrentUserUsername();
      // sending verification code to the user
      const result = await Auth.resendSignUp(username);
      console.log(result);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  };

  const {
    form: {
      code,
    },
    progress: { error, success },
  } = state;
  return (
    <div className={classes.wrapper}>
      <h2 style={{ color: 'red' }}>{error}</h2>
      Email with the verification code has been sent to your account, please enter below.
      <form>
        <input type="text" name="code" value={code} onChange={onInputChange} />
        <button type="button" onClick={onConfirm}>Confirm</button>
        <h4>Didn't receive the verification code?</h4>
        <button type="button" onClick={resendCode}>Resend code</button>
      </form>
    </div>
  );
}

export default ConfirmEmail;
