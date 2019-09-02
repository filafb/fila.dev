import React, {useRef} from 'react'
import { useRender, apply as applyThree, useThree } from 'react-three-fiber'
import { TrackballControls } from 'three/TrackballControls';

applyThree( { TrackballControls })

export default function Controller () {
  const controller = useRef()
  const { camera } = useThree()
  camera.position.z = 70
  useRender(() => {
    return controller.current.update()
  })

  return <trackballControls noRotate minDistance={2} maxDistance={70} ref={controller} args={[camera]} />
}
