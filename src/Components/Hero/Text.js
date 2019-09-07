import React, { useMemo, useRef } from 'react'
import { useThree, useRender } from 'react-three-fiber';
import { a } from 'react-spring/three'

export default function Text ({children, position, opacity, color='white', fontSize = 430 }) {
  const { size: {width, height} } = useThree()

  const canvas = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 2048
    const context = canvas.getContext('2d')
    context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = color
    context.fillText(children, 1024, 1024)
    return canvas
  }, [children, width, height])
  const sprite = useRef()
  useRender(({camera}) => {
    const {x, y } = camera.position
    sprite.current.position.x = x
    sprite.current.position.y = y
  })

  return (
    <a.sprite scale={[1.2, 1.2, 1]} position={position} ref={sprite}>
      <a.spriteMaterial attach="material" transparent opacity={opacity.interpolate([0, 70], [1,0])}>
        <canvasTexture attach="map" image={canvas} premultiplyAplha onUpdate={s => (s.needsUpdate = true)} />
      </a.spriteMaterial>
    </a.sprite>
  )

}


