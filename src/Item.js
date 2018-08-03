import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { cyan } from '@material-ui/core/colors';
import styled from 'react-emotion';
import Skycons from 'react-skycons';
import getIcon from './utils/getIcon.js';

const White = styled(Typography)(
  {
    color: 'white',
  }
);
const Root = styled('div')(
  {
    '& > p': {
      color: 'white',
    },
    padding: '10px 20px 10px 20px',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
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

    return (
      <Root>
        <White>
          {moment.utc(time).format('ddd, hA')}
        </White>
        <White style={{ fontSize: 20 }}>
          <b>{temperature}</b> °C
        </White>
        <White>
          {children}
        </White>
        <Skycons
          style={{ marginTop: 16, width: 114, height: 56 }}
          color='white'
          icon={getIcon(weatherId)}
        />
      </Root>
    )
  }
}

export default Item;
