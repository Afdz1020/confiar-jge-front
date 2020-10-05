import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggin } from '../../actions/globalActions';
import { useDispatch } from 'react-redux';

const Logout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(isLoggin());
    history.push('/');
  });

  return (
    <>
      {' '}
      <p>logout</p>
    </>
  );
};

export default Logout;
