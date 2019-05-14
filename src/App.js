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
    .catch(err => {
      console.error(err)
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
      const { name, price, image_url, address } = restaurant
      return (
        <div className='restaurants' key={index}>
          <h3>{ name }</h3>
          <img src={image_url} alt={`image for ${name}`} />
          { this.intToDollarSign(price) }
          <p>{ address }</p>
        </div>
      )
    })
  }

  intToDollarSign (int) {
    if (!int) return null

    let i = 0
    let dollarSigns = ''

    while(i < int) {
      dollarSigns += '$'
      i++
    }
    return <p className='price'>{dollarSigns}</p>
  }

}


export default App;
