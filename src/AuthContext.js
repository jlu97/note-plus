import React from 'react';

const AuthContext = React.createContext({ authToken: null, isLoggedIn: false });

export default AuthContext;
