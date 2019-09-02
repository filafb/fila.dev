import React, { useCallback } from 'react'
import { a } from 'react-spring/three'
import Images from './ImageGallery/Images'
import { Canvas } from 'react-three-fiber'
import Controller from '../Controller'

export default function Scene ({ mouse }) {
  return (
    <React.Fragment>
      <a.spotLight intensity={1.2} color="white"
      position={[1 , 1, 100]}
      />
      {/* <Controller /> */}
      <Images mouse={mouse} />
    </React.Fragment>
  )
}
