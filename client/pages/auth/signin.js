import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/useRequest';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div
    // style={
    //   {
    //     width: '100%',
    //     height: 500,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }
    // }
    >
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        {errors}
        <button
          // style={{ width: '100%', marginTop: 20 }}
          className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};
