import React, { useCallback } from 'react'
import { useSpring } from 'react-spring/three'
import { Canvas } from 'react-three-fiber'
import Scene from './Components/Hero/Scene'
import Controller from './Components/Controller'
import './Main.css'

export default function Main() {
  const [{mouse}, set] = useSpring(() => ( { top: 0, mouse: [0,0]}))
  const {z} = useSpring({z: 70, from:{z:0}, config: {duration: 10000}, delay: 2000 })
  const onMouseMove = useCallback(({clientX: x, clientY: y} ) => set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2]}), [])
  return (
    <React.Fragment>
      <Canvas className="canvas">
        <Scene mouse={mouse} />
        <Controller zPosition={z} />
      </Canvas>
      <div className="scroll-container" onMouseMove={onMouseMove}>
        <div style={{ height: '100vh' }} />
      </div>
    </React.Fragment>
  )
}
