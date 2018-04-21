import React from 'react';
import PropTypes from 'prop-types';

import {ColorSpectrum} from 'components';

import {maxDivBy, decrRangeByOffset} from 'utils/misc';

import s from './Plot.sass';

const Plot = ({points}) => (
  <main className={s.container}>
    <section className={s.yAxis}>
      {decrRangeByOffset(maxDivBy(Math.max(...points.map(point => point.y)), 10), 0, 10)
        .map((value, key) => (
          <span key={key}>{value}</span>
        ))
      }
    </section>
    <svg className={s.points} viewBox="0 0 100 100">
      {points.map((point, idx) => (
        <circle
          cx={point.x}
          cy={point.y}
          className={s.point}
          stroke={point.color}
          fill={point.color}
          r="2px"
          key={idx}
        />
      ))}
    </svg>
    <ColorSpectrum className={s.spectrum} />
  </main>
);

Plot.defaultProps = {
  points: [],
};

Plot.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.string,
  })),
};

export default Plot;
