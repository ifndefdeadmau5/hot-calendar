import React, { Component } from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import moment from 'moment';
import SwipeableViews from 'react-swipeable-views';
import startCase from 'lodash/startCase';
import max from 'lodash/max';
import min from 'lodash/min';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Item from './Item.js';
import { fetchWeather } from './utils/api';
import logo from './logo.svg';
import './App.css';

const Root = styled('div')({
  textAlign: 'center',
  backgroundColor: '#093356',
  height: '100vh',
});
const H1 = styled('h1')(
  {
    fontSize: 20,
  },
  props => ({ color: props.color }),
);
const Container = styled('div')({
  display: 'flex',
  marginTop: 40,
  marginLeft: 'auto',
  marginRight: 'auto',
  alignItems: 'center',
  width: 'fit-content',
});
const ItemButton = styled(Button)({});
const ModalContainer = styled('div')({
  display: 'flex',
  '&:focus': {
    outline: 'none',
  },
});

class App extends Component {
  state = {
    isLoading: true,
    show: false,
    key: '',
  };

  async getWeather() {
    const result = await fetchWeather();
    const temp = result.list.reduce((acc, cur) => {
      const date = cur.dt_txt.split(' ')[0];
      if (!acc[date]) acc[date] = [];
      acc[date] = [...acc[date], cur];
      return acc;
    }, {});
    const temp2 = Object.keys(temp).reduce((acc, cur) => {
      const tempList = temp[cur].map(({ main }) => main.temp);
      temp[cur] = {
        array: temp[cur],
        primary: {
          date: cur,
          min: min(tempList),
          max: max(tempList),
        },
      };
    }, {});

    result.list = temp;
    return result;
  }

  async componentDidMount() {
    this.data = await this.getWeather();
    this.setState({ isLoading: false });
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const { isLoading, show, key } = this.state;
    if (isLoading) return <span>Loading...</span>;
    const { city, list } = this.data;
    return (
      <Root>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <H1 color="white">This is {city.name}.</H1>
        </header>
        <Container>
          {Object.keys(list).map(key => (
            <ItemButton onClick={() => this.setState({ key, show: true })}>
              <Item
                temperature={`${list[key].primary.min} ~ ${
                  list[key].primary.max
                }`}
                time={startCase(
                  moment.utc(list[key].primary.date).format('dddd'),
                )}
                // weatherId={weather[0].id}
              />
            </ItemButton>
          ))}
        </Container>
        <Modal
          className={css`
            display: flex;
            align-items: center;
            justify-content: center;
          `}
          open={show}
          onClose={this.handleClose}
          onBackdropClick={this.handleClose}
        >
          <ModalContainer>
            {key &&
              list[key].array.map(({ main: { temp }, weather, dt_txt }) => (
                <Item
                  temperature={temp}
                  time={moment.utc(dt_txt).format('hA')}
                  weatherId={weather[0].id}
                />
              ))}
          </ModalContainer>
        </Modal>
      </Root>
    );
  }
}

export default App;
