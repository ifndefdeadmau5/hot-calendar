import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { cyan } from '@material-ui/core/colors';
import styled from 'react-emotion';
import Skycons from 'react-skycons'
import getIcon from './utils/getIcon.js';

const Root = styled('div')(
  {
    padding: '10px 20px 10px 20px',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    border: `1px solid ${cyan[300]}`,
  }
);

class Item extends Component {
  static propTypes = {
    children: PropTypes.node,
    temperature: PropTypes.number,
    time: PropTypes.number,
    weatherId: PropTypes.string,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { time, temperature, children, weatherId } = this.props;
    console.log(time);
    return (
      <Root>
        <Typography>
          {moment.utc(time).format('ddd, hA')}
        </Typography>
        <Typography>
          <b>{temperature}</b>
        </Typography>
        {children}
        <Skycons
          style={{ width: 114, height: 56 }}
          color='black'
          icon={getIcon(weatherId)}
        />
      </Root>
    )
  }
}

export default Item;
