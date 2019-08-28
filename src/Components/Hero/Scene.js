import React, { useCallback } from 'react'
import { useThree } from 'react-three-fiber';
import { a } from 'react-spring/three'
import Images from './ImageGallery/Images'

export default function Scene ({ top, mouse }) {

  return (
    <React.Fragment>
      <a.spotLight intensity={1.2} color="white" position={mouse.interpolate((x,y) => [x / 100, -y / 100, 6.5])} />
      <Images top={top} mouse={mouse} />
    </React.Fragment>
  )
}
