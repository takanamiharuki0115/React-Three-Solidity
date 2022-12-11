import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { MathUtils, Quaternion, Vector3 } from 'three'
import { useCursor, Point, Points, PointMaterial, shaderMaterial } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'

import * as buffer from 'maath/buffer'
import * as misc from 'maath/misc'


const rotationAxis = new Vector3(0, 1, 0).normalize()
const q = new Quaternion()

const MyPointsMaterial = shaderMaterial(
  {
    u: 1,
  },
  /* glsl */ `
    attribute float size;
    attribute vec3 color;

    varying vec3 vColor;

    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = size * ( 300.0 / -mvPosition.z );
      gl_Position = projectionMatrix * mvPosition;
    }

  `,
  /* glsl */ `
    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4( vColor, 1.0 );

      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }
  `
)

extend({ MyPointsMaterial })

// @ts-ignore
const makeBuffer = (...args) => Float32Array.from(...args)

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
  
  const n = 25_000
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
      <myPointsMaterial />
    </Points>
  )
}

export default CubePoints