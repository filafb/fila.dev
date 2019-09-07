import React, {useRef, useMemo} from 'react'
import { useRender, apply as applyThree, useThree } from 'react-three-fiber'
import { TrackballControls } from 'three/TrackballControls';
import { animated  } from 'react-spring/three'

applyThree( { TrackballControls })

function Controller ({zPosition}) {
  const controller = useRef()
  const { camera, gl } = useThree()
  const cameraUp = useMemo(() => {
    camera.position.z = zPosition
    return camera
  }, [zPosition])
  useRender(() => {
    return controller.current.update()
  })
  return <trackballControls noRotate minDistance={1} maxDistance={70} ref={controller} args={[cameraUp]} onClick={() => console.log('e')} />
}

export default animated(Controller)
