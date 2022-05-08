import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import Pokedex from './components/Pokedex';
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div> Loading ... </div>
  return (
    <>
    <LoginButton />
    <LogoutButton />
    <Profile/>
    <Pokedex/>
    </>
  );
}

export default App;
