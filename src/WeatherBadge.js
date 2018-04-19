import React, { Component } from 'react';


const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



const TempComponent = ({high, low, sym}) => {
  return (
    <div className='temperature'>
      <div className='high-temp'>
        High: {high} <span>{sym}°</span>
      </div>
      <div className='low-temp'>
        Low: {low} <span>{sym}°</span>
      </div>
    </div>
  );
}
 
class WeatherBadge extends Component {  
  render() {
    const { dateTimeISO, icon, timestamp, minTempF, minTempC, maxTempF, maxTempC } = this.props.forecast;
    const date = new Date(dateTimeISO);
    const dayName = this.props.isToday ? 'Today' : DAYS_OF_WEEK[date.getDay()];

    let temp;
    
    if (this.props.showCelsius) {
      temp = 'C';
    } else {
      temp = 'F';
    }
    let dateString = `${date.getMonth() + 1}/${date.getDate()}`
    
    return (
      <div className='weather-badge'>
        <h3>{dayName} ({dateString})</h3>
        <div className='day-forecast'>
          <img src={`${process.env.PUBLIC_URL}/icons/${icon}`} alt={`${icon.replace('.png', '')}`} />
          <TempComponent high={this.props.forecast[`maxTemp${temp}`]} low={this.props.forecast[`minTemp${temp}`]} sym={temp} />
        </div>
      </div>
    );
  }
}

export default WeatherBadge;
