import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { MathUtils, Quaternion, Vector3 } from 'three'
import { Point, Points, PointMaterial } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'

import * as buffer from 'maath/buffer'
import * as misc from 'maath/misc'

const rotationAxis = new Vector3(0, 1, 0).normalize()
const q = new Quaternion()

// @ts-ignore
const makeBuffer = (...args) => Float32Array.from(...args)
const PointEvent = ({
  color, 
  ...props
}: any) => {
  const [hovered, setHover] = React.useState(false)
  const [clicked, setClick] = React.useState(false)
  return (
    <Point
      {...props}
      color={clicked ? 'hotpink' : hovered ? 'red' : color}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
      onClick={(e) => (e.stopPropagation(), setClick((state) => !state))}
    />
  )
}

interface BufferCubeProps {
  route: string
  positionY?: number
}

const CubePoints: React.FC<BufferCubeProps> = ({
  route,
  positionY = 0,
  ...props
}) => {
  const router = useRouter()
  
  const n = 2_000
  const [positionA] = React.useState(() => makeBuffer({ length: n * 3 }, () => MathUtils.randFloatSpread(1)))
  const [positionB] = React.useState(() => makeBuffer({ length: n * 3 }, () => MathUtils.randFloatSpread(5)))
  const [positionFinal] = React.useState(() => positionB.slice(0))
  const [color] = React.useState(() => makeBuffer({ length: n * 3 }, () => Math.random()))
  const [size] = React.useState(() => makeBuffer({ length: n }, () => Math.random() * 0.2))
  
  useFrame(({ clock }) => {
    const et = clock.getElapsedTime()
    const t = misc.remap(Math.sin(et), [-1, 1], [0, 1])

    buffer.rotate(color, { q: q.setFromAxisAngle(rotationAxis, t * 0.01) })

    buffer.lerp(positionA, positionB, positionFinal, t)
    buffer.rotate(positionB, {
      q: q.setFromAxisAngle(rotationAxis, t * t * 0.1),
    })
  })

  return (
    <Points positions={positionFinal} colors={color} sizes={size} onClick={() => router.push(route)}>
      {/* @ts-ignore */}
      <PointMaterial transparent vertexColors size={15} sizeAttenuation={false} depthWrite={false} />
    </Points>
  )
}

export default CubePoints