import axios from 'axios';

const apiKey = '6ccd91ee666f1f4b4f9e77116a5c82cf';

function getWeatherToday(city) {
  return axios.get('https://api.openweathermap.org/data/2.5/weather?q='+ city + 'APPID='+apiKey)

}

function getWeatherWeek(city) {
  return axios.get('https://api.openweathermap.org/data/2.5/forecast?q='+ city + 'APPID='+apiKey)
}

const helpers = {
  getWeatherInfo: function(city){
    return axios.all([getWeatherToday(city), getWeatherWeek(city)])
  .then(axios.spread(function (today, week) {
    console.log('util',today, week);
  }))
  }
  // .catch(function (error) {
  //   console.log(error);
  // });
}
