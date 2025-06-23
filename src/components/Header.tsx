import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { isAuthenticated, signOut } from '../services/auth';

const Header: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuth(false);
      navigate('/signin');
    } catch (error) {
      console.error('Sign out error:', error);
      setIsAuth(false);
      navigate('/signin');
    }
  };

  return (
    <header className="border-b p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Weather App
        </Link>
        
        <div className="flex gap-2">
          {isAuth ? (
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;