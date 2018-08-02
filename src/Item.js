import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { cyan } from '@material-ui/core/colors';
// import  from 'material-ui/core';
import styled from 'react-emotion';

const Root = styled('div')(
  {
    padding: '10px 20px 10px 20px',
    width: 80,
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    border: `1px solid ${cyan[300]}`,
  }
);

class Item extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    temperature: PropTypes.number,
    time: PropTypes.number,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { classes, intl, time, temperature, children } = this.props;
    console.log(time);
    return (
      <Root>
        <Typography>
          {moment.utc(time).format('ddd, hA')}
          {/* {time} */}
        </Typography>
        <Typography>
          <b>{temperature}</b>
        </Typography>
        {children}
      </Root>
    )
  }
}

export default Item;
