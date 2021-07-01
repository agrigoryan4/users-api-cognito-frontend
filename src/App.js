import './App.css';
import Amplify from 'aws-amplify';
import Main from './components/Main';
// aws
import config from './config';

const { aws: { cognito: { region, userPoolId, appClientId } } } = config;

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region,
    userPoolId,
    userPoolWebClientId: appClientId,
  },
});

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
