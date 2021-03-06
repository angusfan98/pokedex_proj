import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import Pokedex from './components/Pokedex';
import SearchPokemon from './components/searchPokemon';
import Catch from './components/Catch';
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div> Loading ... </div>
  return (
    <>
    <div className="app-container">
    <LoginButton />
    <LogoutButton />
    <Profile/>
    <Catch/>
    <SearchPokemon/>
    <Pokedex/>
    </div>
    </>
  );
}

export default App;
