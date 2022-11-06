[![Netlify Status](https://api.netlify.com/api/v1/badges/010e8864-fbd4-43ab-ad70-0435a892b4a1/deploy-status)](https://app.netlify.com/sites/react-three-next-ts/deploys)
# :japanese_castle: React-Three-Next-TS starter&nbsp;&nbsp;&nbsp;<a href="https://app.netlify.com/start/deploy?repository=https://github.com/marc-aurele-besner/react-three-next-ts&stack=fauna"><img src="https://www.netlify.com/img/deploy/button.svg"></a>

A minimalist starter for React, React-three-fiber and Threejs in Typescript.

This starter allows you to navigate seamlessly between pages with dynamic dom and/or canvas content without reloading or creating a new canvas every time.

### ⚫ Demo :

[![image](https://user-images.githubusercontent.com/2223602/192515587-eac9e26b-d691-4496-a614-85729764b6b0.jpg)](https://react-three-next.vercel.app/)

### How to use

#### Installation

_Tailwind is the default style. styled-components (styled) is also available._


### :passport_control: Typescript



### :memo: Note:

**Regarding the new layout system in next@13**:

While the app directory is still in beta we are still investigating on the layout implementation, but for now it's more stable to use pages.
An alternative branch will be available in the near future with the app directory architecture. It will be accessible through the starter CLI. Contribution is welcome
[Follow the progress of layout implementation here.](https://github.com/pmndrs/react-three-next/issues/103)

### :mount_fuji: Features

- [x] GLSL imports
- [x] Template for meta data and header
- [x] Clean code using ESlint and Prettier
- [x] VSCode debug profiles for the server, Chrome, and Firefox
- [x] PWA Support

### :bullettrain_side: Architecture

Inform the nextjs page that the component is a Threejs component. For that, simply add the **canvas** property to the parent component.

```jsx
export default function Page(props) {
  return <div>Hello !</div>
}
// Canvas contents go here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.canvas = (props) => (
  <mesh>
    <boxGeometry />
    <meshBasicMaterial color='hotpink' />
  </mesh>
)
```

### :control_knobs: Available Scripts

- `yarn dev` - Next dev
- `yarn analyze` - Generate bundle-analyzer
- `yarn lint` - Audit code quality
- `yarn build` - Next build
- `yarn start` - Next start
- `yarn export` - Export to static HTML

### ⬛ Stack

- [`threejs`](https://github.com/mrdoob/three.js/) &ndash; A lightweight, 3D library with a default WebGL renderer.
- [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber) &ndash; A React renderer for Threejs on the web and react-native.
- [`@react-three/drei` - Optional](https://github.com/pmndrs/drei) &ndash; useful helpers for react-three-fiber
- [`@react-three/a11y` - Optional](https://github.com/pmndrs/react-three-a11y/) &ndash; Accessibility tools for React Three Fiber
- [`r3f-perf` - Optional](https://github.com/RenaudRohlinger/r3f-perf) &ndash; Tool to easily monitor react threejs performances.

### How to contribute :

```bash
git clone https://github.com/pmndrs/react-three-next
&& cd react-three-next && yarn install
```

### Maintainers :

- [`twitter 🐈‍⬛ @onirenaud`](https://twitter.com/onirenaud)
