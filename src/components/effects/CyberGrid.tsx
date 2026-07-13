import { useEffect, useRef } from 'react'

/**
 * WebGL Shader Background
 * Ported from the Stitch HTML — animated cyber grid with scanning lines,
 * mouse-reactive glow, and floating data nodes.
 */
export default function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return

    // Sync canvas size with layout
    const syncSize = () => {
      const w = canvas.clientWidth || 1280
      const h = canvas.clientHeight || 720
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(syncSize).observe(canvas)
    }
    syncSize()

    // Vertex shader
    const vertexSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader — enhanced cyber grid
    const fragmentSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      float grid(vec2 uv, float res) {
        vec2 g = fract(uv * res);
        return 1.0 - smoothstep(0.0, 0.04, min(g.x, g.y) * (1.0 - max(g.x, g.y)));
      }

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      void main() {
        vec2 uv = v_texCoord;
        
        // Correct aspect ratio
        float aspect = u_resolution.x / u_resolution.y;
        uv.x *= aspect;
        
        vec2 mouse = u_mouse / u_resolution;
        mouse.x *= aspect;
        
        // Deep base color
        vec3 color = vec3(0.015, 0.03, 0.06);
        
        // Primary animated grid
        float g1 = grid(uv + vec2(u_time * 0.008), 24.0);
        color += g1 * vec3(0.0, 0.4, 0.8) * 0.08;
        
        // Secondary finer grid
        float g2 = grid(uv + vec2(-u_time * 0.005, u_time * 0.003), 48.0);
        color += g2 * vec3(0.0, 0.2, 0.6) * 0.04;
        
        // Horizontal scan line
        float scanLine = smoothstep(0.495, 0.5, fract(uv.y - u_time * 0.08)) 
                       * smoothstep(0.505, 0.5, fract(uv.y - u_time * 0.08));
        color += scanLine * vec3(0.0, 0.9, 1.0) * 0.12;
        
        // Vertical scan line (slower)
        float vScan = smoothstep(0.498, 0.5, fract(uv.x - u_time * 0.03))
                    * smoothstep(0.502, 0.5, fract(uv.x - u_time * 0.03));
        color += vScan * vec3(0.0, 0.5, 1.0) * 0.06;
        
        // Mouse glow with smooth falloff
        float dist = distance(uv, vec2(mouse.x, 1.0 - mouse.y));
        float glow = smoothstep(0.35, 0.0, dist);
        color += glow * vec3(0.0, 0.5, 0.9) * 0.18;
        
        // Data nodes
        float nodes = sin(uv.x * 60.0 + u_time * 0.8) * cos(uv.y * 60.0 - u_time * 0.6);
        nodes = smoothstep(0.96, 1.0, nodes);
        color += nodes * vec3(0.0, 0.7, 1.0) * 0.15;
        
        // Random sparkles
        float sparkle = hash(floor(uv * 100.0 + u_time * 0.5));
        sparkle = smoothstep(0.998, 1.0, sparkle);
        color += sparkle * vec3(0.3, 0.8, 1.0) * 0.3;
        
        // Vignette
        float vignette = smoothstep(1.6, 0.4, length(uv - 0.5));
        color *= vignette;
        
        // Subtle color grading
        color = pow(color, vec3(0.95));
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Compile shader
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()!
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexSource))
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragmentSource))
    gl.linkProgram(program)
    gl.useProgram(program)

    // Geometry
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const posAttr = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posAttr)
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0)

    // Uniforms
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')

    const mouse = { x: 0.5, y: 0.5 }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width && rect.height) {
        mouse.x = ((e.clientX - rect.left) / rect.width) * canvas.width
        mouse.y = (1.0 - (e.clientY - rect.top) / rect.height) * canvas.height
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let animId: number
    const render = (t: number) => {
      if (typeof ResizeObserver === 'undefined') syncSize()
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (uTime) gl.uniform1f(uTime, t * 0.001)
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height)
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animId = requestAnimationFrame(render)
    }
    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block', opacity: 0.5 }}
    />
  )
}
