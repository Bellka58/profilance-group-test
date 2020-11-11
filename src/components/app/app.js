import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MAIN_PAGE, NEWS_PAGE } from '../../constants/paths';
import { MainPage, NewsPage } from '../../pages';
import store from '../../store';
import Header from '../header';
import LogInModal from '../login-modal';

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <Provider store={store}>
      <Router>
        <div className="app__container">
          {showAuthModal && (
            <LogInModal closeModal={() => setShowAuthModal(false)} />
          )}
          <Header setShowAuthModal={setShowAuthModal} />
          <div className="app">
            <Route exact path={MAIN_PAGE} component={MainPage} />
            <Route path={NEWS_PAGE} component={NewsPage} />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
