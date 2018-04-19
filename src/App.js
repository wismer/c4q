import React, { Component } from 'react';
import WeatherBadge from './WeatherBadge';
import logo from './logo.svg';
import './App.css';


// these would be hidden elsewhere
const CLIENT_ID = 'KJ07ysudwfbyM3cp2a6VU';
const CLIENT_SECRET = 'QZly3ofkt8wwwMSb1wqWbJTQGdYbPdXsjCowxLQX';
const API_URL = `http://api.aerisapi.com/forecasts/11101?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;


class App extends Component {
  state = {
    weekForecast: [],
    showCelsius: false,
    loading: true,
    errorResponse: null
  };
  
  switchTemperatureType() {
    this.setState({ showCelsius: !this.state.showCelsius });
  }

  componentWillMount() {
    fetch(API_URL).then(response => {
      if (response.ok) {
        return response.json()  
      } else {
        return Promise.reject(response.statusText);
      }
    }).then(data => {
      if (data.error) {
        return this.setState({ errorResponse: data.error.description, loading: false });
      }
      let forecastData = data.response[0];
      this.setState({
        weekForecast: forecastData.periods,
        loading: false
      });
    }, errorResponse => {
      this.setState({ errorResponse, loading: false });
    });
  }

  render() {;
    let { loading, showCelsius, errorResponse } = this.state;
    
    let weeklyForecast = this.state.weekForecast.map((forecast, idx) => {
      return (
        <WeatherBadge key={idx} isToday={idx === 0} forecast={forecast} showCelsius={showCelsius} />
      );
    });
    let content;
    if (errorResponse && !loading) {
      content = <div id='err'>Oops! {errorResponse}</div>;
    } else if (loading) {
      content = <div id='loading'>I'm a spinner! Watch me spin! *spins*</div>;
    } else {
      content = <div id='weekly-forecast'>{weeklyForecast}</div>;
    }

    return (
      <div id="app">
        <div onClick={this.switchTemperatureType.bind(this)} id='container'>
          {content}
        </div>
      </div>
    );
  }
}

export default App;
