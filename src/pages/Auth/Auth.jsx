import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import classes from './Auth.module.css';
import amazonlogo from '../../assets/amazonforsignin.webp';
import { auth } from '../../../Utility/Firebase';
import { DataContext } from '../../components/Dataprovider/Dataprovider';
import { ClipLoader } from 'react-spinners';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [{ user }, dispatch] = useContext(DataContext);
  console.log({ user });

  const navigate=useNavigate()
  const navStateData = useLocation();

  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });

  const authhandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (e.target.name === 'signup') {
      setLoading({ ...loading, signup: true }); // Corrected: set signup to true

      // Create a new user (Sign Up)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({
            type: 'SET_USER',
            user: userinfo.user,
          });
          setLoading({ ...loading, signup: false });

          navigate(navStateData?.state?.redirect || "/");
          //if there is a redirect url then go through it otherwise go back to main page 
        })
        .catch((error) => {
          console.error('Error with sign-up:', error.message);
          setError(error.message);
          setLoading({ ...loading, signup: false });
        });
    } else if (e.target.name === 'signin') {
      setLoading({ ...loading, signin: true }); // Corrected: set signin to true

      // Sign in an existing user
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({
            type: 'SET_USER',
            user: userinfo.user,
          });
          setLoading({ ...loading, signin: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          console.error('Error with sign-in:', error.message);
          setError(error.message);
          setLoading({ ...loading, signin: false });
        });
    }
  };

  return (
    <div className={classes.maincontainer}>
      <Link to="/">
        <img src={amazonlogo} alt="Amazon Logo" />
      </Link>

      <div className={classes.innercontainer}>
        <h1>Sign In</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {" "}
            {navStateData?.state?.msg}
          </small>
        )}

        <form>
          <div>
            <label htmlFor="email">Email</label> <br />
            <input
              value={email}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label> <br />
            <input
              value={password}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button name="signin" type="submit" onClick={authhandler}>
            {loading.signin ? <ClipLoader color="white" size={15} /> : 'Sign In'}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see
          our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.
        </p>

        <button
          name="signup"
          type="submit"
          className={classes.createbutton}
          onClick={authhandler}
        >
          {loading.signup ? <ClipLoader /> : 'Create your Amazon Account'}
        </button>
        <small style={{ paddingTop: '30px', color: 'red' }}>{error}</small>
      </div>
    </div>
  );
}

export default Auth;
