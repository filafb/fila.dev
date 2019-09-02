import React, { useMemo, useState, useCallback } from 'react'
import { TextureLoader } from 'three/src/Three'
import { a } from 'react-spring/three'
import { useThree } from 'react-three-fiber'

export default function Image({ url, opacity, scale, position }) {
  const [{ width, height }, set] = useState(() => ({ width: 1, height: 1 }))
  const [loaded, setLoad] = useState(false)
  const texture = useMemo(() => new TextureLoader().load(url, onLoad), [url])

  function onLoad(texture) {
    set({
      width: texture.image.width,
      height: texture.image.height
    })
    setLoad(true)
  }
  const ratio = width / height
  const heightAspect = 3 * ratio
  const widthAspect = ratio * heightAspect
  //console.log(widthAspect, heightAspect )
  return (
    loaded ?
    <a.mesh position={position}>
      <a.planeBufferGeometry attach="geometry" args={[widthAspect, heightAspect]} />
      <a.meshLambertMaterial attach="material" transparent opacity={1}>
        <primitive attach="map" object={texture} />
      </a.meshLambertMaterial>
    </a.mesh> :
    null
  )
}
