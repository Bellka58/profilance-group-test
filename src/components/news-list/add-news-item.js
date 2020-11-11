import React, { useState } from 'react';

const fieldNames = {
  title: 'Заголовок',
  description: 'Текст',
};

const AddNewsItem = ({ addNewsItem, closeAddNewsItem }) => {
  const [newsItem, setNewsItem] = useState({
    title: '',
    description: '',
  });
  const [fieldsError, setFieldsError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newsItem.title || !newsItem.description) {
      const fields = Object.entries(newsItem).reduce(
        (prev, [key, value], idx) => {
          if (!value) {
            if (!prev) {
              return `"${fieldNames[key]}"`;
            }
            return `${prev}, "${fieldNames[key]}"`;
          }
          return prev;
        },
        ''
      );
      setFieldsError(`Заполните поля: ${fields}`);
      return;
    }
    const date = new Date().toISOString();
    const id = `f${(+new Date()).toString(16)}`;
    addNewsItem({ ...newsItem, date, id });
    closeAddNewsItem();
  };

  const setValue = (paramName) => (e) => {
    setFieldsError('');
    setNewsItem((prev) => ({ ...prev, [paramName]: e.target.value }));
  };

  return (
    <div className="add-news-item">
      <p className="add-news-item__error">{!!fieldsError && fieldsError}</p>
      <form className="add-news-item__form">
        <input
          className="add-news-item__title text-input"
          type="text"
          value={newsItem.title}
          onChange={setValue('title')}
          placeholder={fieldNames.title}
        />
        <textarea
          className="add-news-item__description text-input"
          type="text"
          value={newsItem.description}
          onChange={setValue('description')}
          placeholder={fieldNames.description}
        />
        <button className="add-news-item__button button" onClick={handleSubmit}>
          Добавить
        </button>
      </form>
      <button
        className="add-news-item__cancel-button button"
        onClick={closeAddNewsItem}
      >
        Отмена
      </button>
    </div>
  );
};

export default AddNewsItem;
