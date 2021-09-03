import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('../../static/img/code.svg').default,
    description: (
      <>
        With great documentation and intuitive code, use Ikyr engines to build your application easily.
      </>
    ),
  },
  {
    title: 'Different abstract levels',
    Svg: require('../../static/img/abstract-levels.svg').default,
    description: (
      <>
        You can use a render engine if you just want to draw objects yourself and play with vulkan, or use our game engine built on this renderer to create your game !
      </>
    ),
  },
  {
    title: 'Fast and efficient',
    Svg: require('../../static/img/speed.svg').default,
    description: (
      <>
        Based on Vulkan, Ikyr is designed to be fast and efficient. The engine will analyze your code to adapt itself and be faster.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
