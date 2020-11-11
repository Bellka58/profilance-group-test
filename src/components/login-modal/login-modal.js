import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  userLogInFailure,
  userLogInRequest,
  userLogInSuccess,
} from '../../actions';
import { logInRequest } from '../../utils';
import Loader from '../shared/loader/loader';

const LogInModal = ({
  loginRequest,
  loginSuccess,
  loginFailure,
  closeModal,
  isLoading,
}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const ref = useRef(null);

  const setValue = (func) => (e) => {
    setError('');
    func(e.target.value);
  };

  const clickListener = useCallback(
    (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        closeModal();
      }
    },
    [ref.current]
  );

  useEffect(() => {
    document.addEventListener('click', clickListener);
    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password) {
      setError('Не все поля заполнены');
      return;
    }
    loginRequest();
    logInRequest(name, password)
      .then((res) => {
        loginSuccess(res);
        closeModal();
      })
      .catch((error) => {
        loginFailure(error);
        setError('Неверные логин и пароль');
      });
  };

  return (
    <div className="login-modal__container">
      <div className="login-modal__backdrop" ref={ref} />
      <div className="login-modal">
        <h2 className="login-modal__title">Вход</h2>
        <div className="login-modal__error">{error ? error : null}</div>
        <div className="login-modal__close-button" onClick={closeModal} />
        <form className="login-modal__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="login-modal__input text-input"
            value={name}
            onChange={setValue(setName)}
            placeholder="Имя"
          />
          <input
            type="password"
            name="current-password"
            className="login-modal__input text-input"
            value={password}
            onChange={setValue(setPassword)}
            placeholder="Пароль"
          />
          <button
            className="login-modal__submit-button button"
            style={isLoading ? { paddingTop: 0, paddingBottom: 0 } : null}
            onClick={handleSubmit}
          >
            {!isLoading ? 'Войти' : <Loader size={20} lineWidth={2} />}
          </button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loginRequest: () => dispatch(userLogInRequest()),
  loginSuccess: (data) => dispatch(userLogInSuccess(data)),
  loginFailure: (error) => dispatch(userLogInFailure(error)),
});

const mapStateTopProps = (state) => ({
  isLoading: state.loading,
});

export default connect(mapStateTopProps, mapDispatchToProps)(LogInModal);
