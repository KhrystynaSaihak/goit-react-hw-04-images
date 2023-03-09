import React from 'react';
import { Component } from 'react';
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

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    totalHits: 0,
    error: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.getImgCollection(query, page);
    }
  }

  checkTotalHits(page) {
    return page * 12 < this.state.totalHits;
  }

  getImgCollection = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const data = await API.getImgCollection(query, page);
      const images = data.hits;
      const totalHits = data.totalHits;
      if (!images.length) {
        NotificationManager.warning('Sorry, No matches for your search');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        totalHits,
      }));
    } catch (erorr) {
      this.setState({ error: true });
      NotificationManager.warning('Sorry, something went wrong');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const queryData = e.target.seachField.value;
    if (queryData === this.state.query) {
      this.setState({
        page: 1,
      });
    } else {
      this.setState({
        query: queryData,
        page: 1,
        images: [],
        totalHits: 0,
      });
    }
    e.target.seachField.value = '';
  };

  handleMoreImage = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images } = this.state;
    return (
      <AppStyles>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>

        {images.length !== 0 && <ImageGallery images={images}></ImageGallery>}
        {this.state.isLoading === true && <Loader></Loader>}

        {this.state.query !== '' &&
          this.state.images.length !== 0 &&
          this.state.isLoading !== true &&
          this.checkTotalHits(this.state.page) && (
            <Button handleMoreImage={this.handleMoreImage}></Button>
          )}

        <NotificationContainer />
      </AppStyles>
    );
  }
}
