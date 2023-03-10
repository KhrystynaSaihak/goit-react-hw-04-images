import React from 'react';
import { useState, useEffect } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import * as API from 'services/pixabay-service';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { AppStyles } from './App.styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    const getImgCollection = async (query, page) => {
      try {
        setIsLoading(true);
        const data = await API.getImgCollection(query, page);
        const newImages = data.hits;
        if (!newImages.length) {
          NotificationManager.warning('Sorry, No matches for your search');
        }
        setImages(prev => [...prev, ...newImages]);
        setTotalHits(data.totalHits);
      } catch (erorr) {
        setError(true);
        NotificationManager.warning('Sorry, something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getImgCollection(query, page);
  }, [page, query]);

  const checkTotalHits = page => {
    return page * 12 < totalHits;
  };

  const handleSubmit = async queryData => {
    setImages([]);
    setTotalHits(0);
    setQuery(queryData);
    setPage(1);
  };

  const handleMoreImage = () => {
    setPage(prev => prev + 1);
  };

  return (
    <AppStyles>
      <Searchbar handleSubmit={handleSubmit}></Searchbar>

      {images.length !== 0 && <ImageGallery images={images}></ImageGallery>}
      {isLoading === true && <Loader></Loader>}

      {query !== '' &&
        images.length !== 0 &&
        isLoading !== true &&
        checkTotalHits(page) && (
          <Button handleMoreImage={handleMoreImage}></Button>
        )}

      <NotificationContainer />
    </AppStyles>
  );
};
