import React, { Component } from 'react';
import axios from 'axios';
import CinemaItem from './CinemaItem';
import _ from 'lodash';
import './style.css';

export default class App extends Component {
  state = {
    cinemas: [],
    rangeStart: 1
  }

  url = "https://api.kinohod.ru/api/restful/v1/cinemas?city=1&limit=10&rangeStart="

  componentDidMount = () => {
    // If body height is less or equal than window.innerHeight, double data (limit=20) is fetched to make onScroll event available
    const num = this.state.rangeStart;
    const newLimitUrl = this.url.replace("10","20");
    const condition = window.innerHeight>=830;

    const doubleDataLoad = () => {
      this.loadData(newLimitUrl);
      this.setState({
        rangeStart: num + 20
      });
    };

    const simpleDataLoad = () => {
      this.loadData(this.url);
      this.setState({
        rangeStart: num + 10
      });
    }
    
    condition ? doubleDataLoad() : simpleDataLoad();
    
    window.addEventListener('scroll', _.debounce(this.onScrollList, 50), false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollList, false);
  }

  loadData = (url) => {
    axios.get(url + this.state.rangeStart)
      .then(result => {
        const cinemaList = this.state.cinemas;
        const data = result.data.data;
        this.setState({
          cinemas: [...cinemaList,...data]
        })

      })
  }

  onScrollList = () => {
    const num = this.state.rangeStart;
    const condition = (window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight-246);
    if (condition) {
      this.loadData(this.url);
      this.setState({
        rangeStart: num + 10
      });
    }
  }

  render() {
    return (
      <div className="list" onScroll={this.onScrollList}>
        {
          this.state.cinemas ?
            this.state.cinemas.map((item) => (
              <CinemaItem
                key={item.id}
                className="list_item"
                id={item.id}
                title={item.attributes.shortTitle ? item.attributes.shortTitle : item.attributes.title}
                address={item.attributes.address ? item.attributes.address : item.attributes.mall}
                subway={item.attributes.subway}
                labels={item.attributes.labels.length ? item.attributes.labels : ""}
              />
            )) :
            null
        }
      </div>
    );
  }
}
