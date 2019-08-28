import React, { useMemo, useState, useCallback } from 'react'
import { TextureLoader } from 'three/src/Three'
import { useSpring, a } from 'react-spring/three'

export default function Image ({ url, opacity, scale, z, index, ...props}) {
  const texture = useMemo(() => new TextureLoader().load(url), [url])
  const [ hovered, setHover ] = useState(false)
  const hover = useCallback(() => setHover(true), [])
  const unhover = useCallback(() => setHover(false), [])
  const { factor } = useSpring({ factor: hovered ? 1.1 : 1})

  return (
    <a.mesh {...props} onHover={hover} onUnhover={unhover}
    scale={factor.interpolate(f => [scale * f, scale * f, 1])}>
      <planeBufferGeometry attach="geometry" args={[10,5]} />
      <a.meshLambertMaterial attach="material" transparent opacity={opacity}>
        <primitive attach="map" object={texture} />
      </a.meshLambertMaterial>
    </a.mesh>
  )
}
