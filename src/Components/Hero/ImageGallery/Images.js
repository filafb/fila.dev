import React from 'react'
import { interpolate } from 'react-spring/three'
import Image from './Image'
import data from '../../../data';

export default function Images ({ top, mouse }) {
  return data.map(([url, x, y, factor, z, scale], index) => (
    <Image
      index={index}
      z={z}
      key={index}
      url={url}
      scale={scale}
      opacity={top.interpolate((top) => {
        return z + top / 2000 * 2
      })
      .interpolate([0,1,2], [0.1,1,0.1])
    }
    position={interpolate([top, mouse], (top, mouse) => {
      return [
        (-mouse[0] * factor) / 50000 + x,
        y + top / 10000,
        z + top / 2000 * 2
      ]
    })}
    />
  ))
}
