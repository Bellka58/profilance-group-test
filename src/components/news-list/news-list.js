import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addNewsFailure,
  addNewsRequest,
  addNewsSuccess,
  approveNewsItem,
  deleteNewsItem,
} from '../../actions';
import { addNewsItemRequest } from '../../utils';
import AddNewsItem from './add-news-item';
import NewsItem from './news-item';

const NewsList = ({
  newsList,
  addNewsRequest,
  addNewsSuccess,
  addNewsFailure,
  userName,
  userRole,
  isUserLoggedIn,
  approveNewsItem,
  deleteNewsItem,
}) => {
  const [showAddNewsOptions, setShowAddNewsOptions] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAddNewsItem = (newsItem) => {
    addNewsRequest();
    addNewsItemRequest(newsItem)
      .then((data) => {
        addNewsSuccess(data);
      })
      .catch((error) => {
        addNewsFailure(error);
      });
  };

  return (
    <div className="news-list">
      {isUserLoggedIn && !showAddNewsOptions && (
        <button
          className="button"
          onClick={() => setShowAddNewsOptions((prev) => !prev)}
        >
          Добавить новость
        </button>
      )}
      {showAddNewsOptions ? (
        <AddNewsItem
          addNewsItem={(newsItem) =>
            handleAddNewsItem({ ...newsItem, user: userName })
          }
          closeAddNewsItem={() => setShowAddNewsOptions(false)}
        />
      ) : null}
      <input
        className="news-list__search text-input"
        placeholder="Поиск новостей"
        value={searchValue}
        onChange={handleSearch}
      />
      {newsList
        .filter(
          ({ title, description }) =>
            description.includes(searchValue) || title.includes(searchValue)
        )
        .map(({ title, description, date, approved, id }) => (
          <NewsItem
            key={id}
            title={title}
            description={description}
            date={date}
            approved={approved}
            approveNewsItem={() => approveNewsItem(id)}
            deleteNewsItem={() => deleteNewsItem(id)}
            isAdmin={userRole === 'admin'}
            isUser={userRole === 'user'}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  newsList:
    state.user.role === 'admin'
      ? state.news
      : state.news.filter(
          (item) => item.user === state.user.userName || item.approved
        ),
  userRole: state.user.role,
  userName: state.user.userName,
  isUserLoggedIn: state.isUserLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  addNewsRequest: () => dispatch(addNewsRequest()),
  addNewsSuccess: (data) => dispatch(addNewsSuccess(data)),
  addNewsFailure: (error) => dispatch(addNewsFailure(error)),
  approveNewsItem: (id) => dispatch(approveNewsItem(id)),
  deleteNewsItem: (id) => dispatch(deleteNewsItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
