import React, { useRef, useMemo, useState } from 'react'
import { a, useSpring } from 'react-spring/three'
import { useRender } from 'react-three-fiber'
import {SphereBufferGeometry, MeshBasicMaterial, Color, Math as MathThree} from 'three/src/Three'

function Dots() {
  let group = useRef()
  const [dotsRendered, renderDots] = useState(false)
  let theta = 45
  const [{z}, setZ ]= useSpring(() => ({z:0}))
  useRender(({camera}) => {
    const cameraPosition = camera.position.z
    window.keepLooping = window.keepLooping || false
    setZ({z: camera.position.z})
    if(!window.keepLooping) {
      if(cameraPosition >= 70) {
        renderDots(true)
        window.keepLooping = true
      }
    } else {
      const s = Math.cos(MathThree.degToRad(theta * 2))
      const r = 5 * Math.sin(MathThree.degToRad((theta += 0.01 * cameraPosition/5)))
      group.current.rotation.set(r, r, r)
      group.current.scale.set(s, s, s)
    }
  })
  const coords = useMemo(() => {
    const coords = new Array(1000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
    return coords
  }, [])
  return (
    dotsRendered ?
    <a.group ref={group} scale={[0.01,0.01,0.01]}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} position={[p1, p2, p3]}>
          <sphereBufferGeometry attach="geometry" args={[1,10,10]} />
          <a.meshBasicMaterial color={z.interpolate([0,25, 50, 70], ['#f8f3f1', '#70C1B3', '#247BA0', '#27282F'])} transparent={true} attach="material" />
        </mesh>
      ))}
    </a.group> :
    null
  )
}

export default a(Dots)
