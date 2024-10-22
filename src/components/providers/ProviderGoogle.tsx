'use client'

import { Auth0Provider } from '@auth0/auth0-react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
       domain="dev-vowxff3b.us.auth0.com"
        clientId="USfwkmBtya3dFr2Gmdp1TJnR0ket2Hhk"
        authorizationParams={{
            redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
          }}
          useRefreshTokens={true}
          cacheLocation="localstorage"
        >
          {children}
        </Auth0Provider>
      );
    };
    
    export default AuthProvider;