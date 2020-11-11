import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogOut } from '../../actions';
import { MAIN_PAGE, NEWS_PAGE } from '../../constants/paths';

const Header = ({ setShowAuthModal, isUserLoggedIn, logOut }) => (
  <div className="header">
    <div className="header__nav">
      <Link to={MAIN_PAGE} className="header__nav-item">
        Главная
      </Link>
      <Link to={NEWS_PAGE} className="header__nav-item">
        Новости
      </Link>
      {isUserLoggedIn ? (
        <div className="header__nav-item" onClick={logOut}>
          Выход
        </div>
      ) : (
        <div
          className="header__nav-item"
          onClick={() => setShowAuthModal(true)}
        >
          Вход
        </div>
      )}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.isUserLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(userLogOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
