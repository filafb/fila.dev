import React, { useCallback } from 'react'
import { useSpring } from 'react-spring/three'
import { Canvas } from 'react-three-fiber'
import Scene from './Components/Hero/Scene'
import './Main.css'

export default function Main() {
  const [{top, mouse}, set] = useSpring(() => ( { top: 0, mouse: [0,0]}))

  const onMouseMove = useCallback(({clientX: x, clientY: y} ) => set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2]}), [])

  const onScroll = useCallback(e => {
    set({ top: e.target.scrollTop })
  }, [])

  return (
    <React.Fragment>
      <Canvas className="canvas">
        <Scene top={top} mouse={mouse} />
      </Canvas>
      <div className="scroll-container" onScroll={onScroll} onMouseMove={onMouseMove}>
        <div style={{ height: '10000vh' }} />
      </div>
    </React.Fragment>
  )
}
