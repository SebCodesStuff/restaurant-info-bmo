import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      data: {
        restaurants: []
      }
    }
  }

  componentDidMount () {
    fetch('https://opentable.herokuapp.com/api/restaurants?city=toronto')
    .then(res => {
      if (res.status !== 200) {
        console.log('There was an issue fetching the data')
        return
      }

      res.json().then(data => {
        this.setState({ data })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className='nav' >
          <h1>Top Restaurants</h1>
        </div>
        <h2>Results for Toronto</h2>
        <div className='restaurant-container'>
          { this.displayRestaurants() }
        </div>
      </div>
    )
  }

  displayRestaurants () {
    const { restaurants } = this.state.data
    if (!restaurants.length) return null
    return restaurants.map((restaurant, index) => {
      const { name, price, image_url, phone } = restaurant
      return (
        <div className='restaurants' key={index}>
          <p>{ restaurant.name }</p>
          <img src={image_url} alt={`image for ${name}`} />
          { this.intToDollarSign(price) }
          { this.formatTelephoneNumber(phone) }
        </div>
      )
    })
  }

  intToDollarSign (str) {
    if (!str) return null
    const int = parseInt(str)
    let i = 0
    let dollarSigns = ''

    while(i <= int) {
      dollarSigns += '$'
      i++
    }
    return <p>{dollarSigns}</p>
  }

  formatTelephoneNumber (phone) {
    if (!phone) return null
    let phoneArr = Array.from(phone)
    phoneArr.splice(10, 3, '') // Removes excess digits
    phoneArr.splice(3, 0, '-')
    phoneArr.splice(7, 0, '-')
    return <p>{ phoneArr }</p>
  }
}

export default App;
