import React, { useCallback } from 'react'
import { a } from 'react-spring/three'
import Images from './ImageGallery/Images'
import Text from './Text'
import Dots from './Dots'
import Background from './Background'
import { useRender } from 'react-three-fiber';
import { useSpring } from 'react-spring/three';

export default function Scene({ mouse }) {
  const [{z}, setZ ]= useSpring(() => ({z:0}))

  useRender(({camera}) => {
    setZ({z: camera.position.z})
  })
  return (
    <React.Fragment>
      <a.spotLight intensity={1.2} color="white"
        position={[1, 1, 100]}
      />
      <Background color={z.interpolate([0,25, 50, 70], ['#27282F', '#247BA0', '#70C1B3', '#f8f3f1'])} />
      <Dots />
      <Images mouse={mouse} />
      <Text
        position={[0, 0, 0]}
        opacity={z}
      >
        filafb.dev
      </Text>
    </React.Fragment>
  )
}
