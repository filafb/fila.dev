import React from 'react'
import { a } from 'react-spring/three'
import Images from './ImageGallery/Images'
import Text from './Text'

export default function Scene({ mouse }) {

  return (
    <React.Fragment>
      <a.spotLight intensity={1.2} color="white"
        position={[1, 1, 100]}
      />
      <Images mouse={mouse} />
      <Text
        position={[0, 0, -1]}
        opacity={1}
        color='black'
      >
        filafb.dev
      </Text>
    </React.Fragment>
  )
}
