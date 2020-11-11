import React from 'react';
import moment from 'moment';

const NewsItem = ({
  title,
  description,
  date,
  approved,
  approveNewsItem,
  deleteNewsItem,
  isAdmin,
  isUser,
}) => {
  const approvedContent = approved ? (
    <p className="news-item__approved">Одобрено</p>
  ) : isAdmin ? (
    <>
      <button className="button" onClick={approveNewsItem}>
        Одобрить
      </button>
      <button className="news-item__delete-btn button" onClick={deleteNewsItem}>
        Удалить
      </button>
    </>
  ) : (
    <p>Еще не одобрено</p>
  );
  return (
    <div className="news-item">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Дата создания: {moment(date).format('L')}</p>
      {(isUser || isAdmin) && approvedContent}
    </div>
  );
};

export default NewsItem;
