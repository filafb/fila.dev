import React, { useRef, useMemo } from 'react'
import { a } from 'react-spring/three'
import { useRender } from 'react-three-fiber'
import {SphereBufferGeometry, MeshBasicMaterial, Color, Math as MathThree} from 'three/src/Three'

export default function Dots() {
  let group = useRef()
  let theta = 0
  useRender(({camera}) => {
    const cameraPosition = camera.position.z
    const r = 5 * Math.sin(MathThree.degToRad((theta += 0.01 * cameraPosition/5)))
    const s = Math.cos(MathThree.degToRad(theta * 2))
    group.current.rotation.set(r, r, r)
    group.current.scale.set(s, s, s)
  })
  const [geo, mat, coords] = useMemo(() => {
    const geo = new SphereBufferGeometry(1, 10, 10)
    const mat = new MeshBasicMaterial({ color: new Color('black'), transparent: true })
    const coords = new Array(1000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
    return [geo, mat, coords]
  }, [])
  return (
    <a.group ref={group} >
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} onClick={e=>console.log(e)}/>
      ))}
    </a.group>
  )
}
