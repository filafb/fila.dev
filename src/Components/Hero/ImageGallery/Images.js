import React from 'react'
import { interpolate } from 'react-spring/three'
import Image from './Image'
import { useThree } from 'react-three-fiber';
import data from '../../../data';

function random(min, max) { // min and max included
  return Number((Math.random() * (max - min + 1) + min).toFixed(2));
}

export default function Images ({ mouse }) {
  const {
    viewport: { width: viewportWidth, height: viewportHeight }
  } = useThree()
  console.log(viewportWidth, viewportHeight)
  let newData = data.map(el => (
    [el[0], random(-viewportWidth / 4,viewportWidth / 4), random(-viewportHeight / 5,viewportHeight / 5), random(-5,5), random(0,40), 1]
  ))
  let duplicateData = [...newData, ...data.map(el => (
    [el[0], random(-viewportWidth / 4,viewportWidth / 4), random(-viewportHeight / 5,viewportHeight / 5), random(-5,5), random(0,40), 1]
  ))]

  return duplicateData.map(([url, x, y, factor, z, scale], index) => (
    <Image
      key={index}
      url={url}
      scale={scale}
      // opacity={top.interpolate((top) => {
      //   return z + top / 2000 * 2
      // })
      // .interpolate([-30,1,3], [0.1,1,0])
      // }
    position={interpolate([mouse], (mouse) => {
      return [
        (-mouse[0] * factor) / 5000 + x,
        (-mouse[1] * factor) / 5000 + y,
        z
      ]
    })}
    />
  ))
}
