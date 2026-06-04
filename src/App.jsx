import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import {useRef} from 'react'
import { FirstPersonControls, GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei'
// import { spotLightHelper } from 'three'
import { useControls } from 'leva'
// npm install leva 一款可以快速设置一些属性到界面上，方便调试

function AnimatedBox(){
  // 用来访问标签对象
  const refBox = useRef()

  const { speed } = useControls({
    speed: {
      value: 0.005,
      min: 0.0,
      max: 0.3,
      step: 0.001
    }
  })

  // useFrame 会在每一帧渲染之前执行
  useFrame(()=>{
    refBox.current.rotation.x += speed
    refBox.current.rotation.y += speed
    refBox.current.rotation.z += speed
  })

  return (
    <>
      {/* 大括号的语法，必须在标签内，如果放到小括号里面的话，会报错 */}
      {/* 网格做旋转，位移，缩放的变化，都是一个三维向量 */}
      <mesh ref={refBox}>
        
        {/* 一个mesh里面只能有一个形状 */}
        <boxGeometry args={[1,1,1]}></boxGeometry>
        <meshStandardMaterial color={0x00bfff}/>
      </mesh>
    </>
  )
}

function App() {
  return (
      <div id="canvas-container">
        <Canvas>
          {/* 允许用户使用方向键控制视角 */}
          <OrbitControls></OrbitControls>
          {/* 多个相机控制器会很奇怪 */}
          {/* <FirstPersonControls></FirstPersonControls> */}
          <GizmoHelper alignment='bottom-right' margin={[80,80]}>
            <GizmoViewport></GizmoViewport>
          </GizmoHelper>
          <gridHelper></gridHelper>
          {/* 世界坐标轴, 这个坐标轴可以放到网格体里面去，就是网格体自身的坐标轴 */}
          <axesHelper args={[3]}></axesHelper>
          {/* 环境光源 */}
          <ambientLight color="#39d62aff" intensity={0.5} />
          {/* 定向光 */}
          <directionalLight position={[2, 2, 2]} intensity={0.5} />
          {/* 聚光灯 */}
          <spotLight intensity={0.8}></spotLight>
          {/* <spotLightHelper></spotLightHelper> */}
          <AnimatedBox />
        </Canvas>
      </div>
  )
}

export default App
