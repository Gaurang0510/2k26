import { motion } from 'framer-motion'

export default function ParallaxBackground() {
  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
      {/* The Video Background (No Parallax Movement) */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={`${import.meta.env.BASE_URL}video/background.mp4`} type="video/mp4" />
        </video>
      </div>
      
      {/* Dark overlays to blend with the cyber theme and ensure text readability */}
      {/* A lighter base dimming since video might be dark naturally */}
      <div className="absolute inset-0 bg-bg-primary/40" />
      
      {/* A gradient overlay that gets darker towards the bottom to blend sections seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/40 to-bg-primary/95" />
    </div>
  )
}
