import React, { useState } from 'react';

import Login from './components/Login/Login';
import Layout from './container/Layout/Layout';

const App = () => {

  const [user, setUser] = useState(null);

  const onLoginFormSubmit = user => {
    setUser(user);
  }

  return (
    <div>
      {user == null ? <Login onSubmit={onLoginFormSubmit} /> : <Layout currentUser={user} />}
    </div>
  );
}

export default App;