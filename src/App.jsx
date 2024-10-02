import { useContext, useEffect } from 'react';
import './App.css';
import Routing from './Router';
import { DataContext } from './components/Dataprovider/Dataprovider';
import { auth } from '../Utility/Firebase'; // Ensure the correct path to your Firebase config is imported

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // User is signed out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
