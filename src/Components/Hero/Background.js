import React  from 'react'
import { useThree } from 'react-three-fiber'
import { a } from 'react-spring/three'

function Background({color}) {
  const { size: {width, height} } = useThree()
  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry attach="geometry" args={[1,1]} />
      <a.meshBasicMaterial attach="material" color={color} depthTest={false} />
    </mesh>
  )
}

export default a(Background)
