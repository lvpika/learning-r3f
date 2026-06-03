import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import {useRef} from 'react'
function AnimatedBox(){
  // 用来访问标签对象
  const refBox = useRef()

  // useFrame 会在每一帧渲染之前执行
  useFrame(()=>{
    refBox.current.rotation.x += 0.005
    refBox.current.rotation.y += 0.005
    refBox.current.rotation.z += 0.005
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
          <ambientLight color="#39d62aff" intensity={0.5} />
          <directionalLight position={[2, 2, 2]} intensity={0.5} />
          <AnimatedBox />
        </Canvas>
      </div>
  )
}

export default App
