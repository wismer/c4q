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
    todaysForecast: null,
    weekForecast: [],
    showCelsius: false,
    loading: true
  };
  
  switchTemperatureType() {
    this.setState({ showCelsius: !this.state.showCelsius });
  }

  componentWillMount() {
    fetch(API_URL).then(response => response.json()).then(data => {
      let forecastData = data.response[0];
      this.setState({
        todaysForecast: forecastData.periods[0],
        weekForecast: forecastData.periods,
        loading: false
      });
    });
  }

  render() {;
    let { todaysForecast, weekForecast, showCelsius } = this.state;
    let weeklyForecast = weekForecast.map((forecast, idx) => {
      return (
        <WeatherBadge key={idx} isToday={idx === 0} forecast={forecast} showCelsius={showCelsius} />
      );
    });


    return (
      <div id="app">
        <div onClick={this.switchTemperatureType.bind(this)} id='container'>
          <div id='weekly-forecast'>
            {weeklyForecast}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
