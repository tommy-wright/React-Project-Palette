import React from 'react';
import PropTypes from 'prop-types';

import {Title, Lead} from 'components';

import './Jumbotron.sass';

const Jumbotron = ({title, children}) => (
  <div className="jumbotron">
    <Title>{title}</Title>
    <Lead>{children}</Lead>
  </div>
);

Jumbotron.defaultProps = {
  title: '',
  children: '',
};

Jumbotron.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Jumbotron;
