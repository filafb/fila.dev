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
    size: {width, height}
  } = useThree()

  let newData = data.map(el => (
    [el[0], random(-width / 7 / 4,width / 7 / 4), random(-height / 7 / 5,height / 7 / 5), random(-5,5), random(2,60), 1]
  ))
  let duplicateData = [...newData, ...data.map(el => (
    [el[0], random(-width / 7 / 4,width / 7 / 4), random(-height / 7 / 5,height / 7 / 5), random(-5,5), random(2,60), 1]
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
        (-mouse[0] * factor) / 5000 + z
      ]
    })}
    />
  ))
}
