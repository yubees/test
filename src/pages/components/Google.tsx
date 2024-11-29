import React from 'react';
import { GoogleLogin, useGoogleOneTapLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Google: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    try {
      if (!response.credential) {
        console.error('Credential is missing in the response');
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API}/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });

      if (!res.ok) throw new Error('Failed to fetch user data');

      const userData = await res.json();
      console.log('Login Data', userData);

      if (userData.userId) {
        localStorage.setItem('userToken', userData.userId);
        navigate(`/${userData.user}`);
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleLoginError = () => {
    console.error('Google Login Failed');
  };

  // Google One-Tap Login
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        if (!credentialResponse.credential) {
          console.error('Credential is missing in the response');
          return;
        }

        const res = await fetch(`${import.meta.env.VITE_API}/auth/google/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: credentialResponse.credential }),
        });

        if (!res.ok) throw new Error('Failed to fetch user data');

        const userData = await res.json();
        console.log('One-Tap Data', userData);

        if (userData.userId) {
          localStorage.setItem('userToken', userData.userId);
          navigate(`/${userData.user}`);
        }
      } catch (error) {
        console.error('One-Tap Login Error:', error);
        navigate('/signin');
      }
    },
    onError: () => {
      console.error('One-Tap Login Failed');
      navigate('/signin');
    },
  });

  return (
    <Button className="w-full py-[0.625rem] px-[0.875rem]">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        useOneTap
        width={"360px"}
      />
    </Button>
  );
};

export default Google;
