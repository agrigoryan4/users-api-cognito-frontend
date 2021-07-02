import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// aws
import { Auth } from 'aws-amplify';
//
import classes from './ForgotPassword.module.scss';

function ForgotPassword() {
  const history = useHistory();
  const [state, setState] = useState({
    form: {
      email: '',
      code: '',
      newPassword: '',
    },
    progress: {
      codeSent: {
        success: false,
        error: null,
      },
      newPassword: {
        success: false,
        error: null,
      },
    },
  });

  useEffect(() => {
    if (state.progress.newPassword.success === true) {
      alert('Password reset, redirecting to sign in page...');
      // redirect to sign in page
      history.push('/signin');
    }
  }, [state.progress.newPassword.success]);

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

  // HANDLERS

  const sendCode = async () => {
    const { form: { email } } = state;
    try {
      const result = await Auth.forgotPassword(email);
      console.log(result);
      setState({
        ...state,
        progress: {
          ...state.progress,
          codeSent: {
            error: null,
            success: true,
          },
        },
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        progress: {
          ...state.progress,
          codeSent: {
            error: error.message || error,
            success: false,
          },
        },
      });
    }
  };

  const changePassword = async () => {
    const { form: { email, code, newPassword } } = state;
    try {
      const result = await Auth.forgotPasswordSubmit(email, code, newPassword);
      console.log('password change success, response ->');
      console.log(result);
      setState({
        ...state,
        progress: {
          ...state.progress,
          newPassword: {
            error: null,
            success: true,
          },
        },
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        progress: {
          ...state.progress,
          newPassword: {
            error: error.message || error,
            success: false,
          },
        },
      });
    }
  };

  const {
    form: {
      email, code, newPassword,
    },
    progress: {
      codeSent: { error: codeSentError, success: codeSentSuccess },
      newPassword: { error: newPasswordError, success: newPasswordSuccess },
    },
  } = state;
  return (
    <div className={classes.wrapper}>
      <h2 style={{ color: 'red' }}>
        {codeSentError}
        <br />
        {newPasswordError}
      </h2>
      <h3>Reset password</h3>
      <form>
        {!codeSentSuccess ? (
          <>
            <label>
              Email:
              <input type="text" name="email" value={email} onChange={onInputChange} />
            </label>
            <button type="button" onClick={sendCode}>Send verification code</button>
          </>
        ) : (
          <>
            <label>
              Enter the verification code sent to your email:
              <input type="text" name="code" value={code} onChange={onInputChange} />
            </label>
            <br />
            <label>
              New password:
              <input type="password" name="newPassword" value={newPassword} onChange={onInputChange} />
            </label>
            <button type="button" onClick={changePassword}>Send verification code</button>
          </>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
