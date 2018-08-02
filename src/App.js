import React, { Component } from 'react';
import styled from 'react-emotion';
import Item from './Item.js';
import { fetchWeather } from './utils/api';
import logo from './logo.svg';
import './App.css';

const Root = styled('div')(
  {
    textAlign: 'center',
    backgroundColor: '#093356',
    height: '100vh',
  },
);
const H1 = styled('h1')(
  {
    fontSize: 20,
  },
  props => ({ color: props.color }),
);
const Container = styled('div')(
  {
    display: 'flex',
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: 'fit-content',
  }
);
const Row = styled('div')(
  {
    display: 'flex',
  }
);

class App extends Component {
  state = {
    isLoading: true,
  }
  async getWeather() {
    const result = await fetchWeather();
    const temp = result.list.reduce((acc, cur) => {
      const date = cur.dt_txt.split(' ')[0];
      if(!acc[date]) acc[date] = [];
      acc[date] = [...acc[date], cur];
      return acc;
    }, {});
    const list = Object.keys(temp).map(key => (
      [...temp[key]]
    ));

    result.list = list;
    return result;
  }

  async componentDidMount() {
    this.data = await this.getWeather();
    this.setState({ isLoading: false })
    console.log(this.data);
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <span>Loading...</span>;
    const { city, list } = this.data;
    return (
      <Root>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <H1 color="white">This is {city.name}.</H1>
        </header>
        <Container>
          {list.map((subList) => (
            <Row>
              {subList.map(({ main: { temp }, weather, dt_txt }) => (
                <Item
                  temperature={temp}
                  time={dt_txt}
                  weatherId={weather[0].id}
                />
              ))}
            </Row>
          ))}
        </Container>
      </Root>
    );
  }
}

export default App;
