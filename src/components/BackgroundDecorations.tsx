import { motion } from 'framer-motion'

// 可爱手绘风格背景装饰
export function BackgroundDecorations() {
  const decorations = [
    { emoji: '🌸', top: '5%', left: '5%', size: 'text-3xl', delay: 0 },
    { emoji: '⭐', top: '10%', right: '10%', size: 'text-2xl', delay: 0.2 },
    { emoji: '🌿', top: '20%', left: '8%', size: 'text-2xl', delay: 0.4 },
    { emoji: '☁️', top: '15%', right: '20%', size: 'text-4xl', delay: 0.1 },
    { emoji: '🍀', bottom: '30%', left: '5%', size: 'text-2xl', delay: 0.3 },
    { emoji: '✨', top: '40%', right: '5%', size: 'text-xl', delay: 0.5 },
    { emoji: '🌈', bottom: '20%', right: '8%', size: 'text-3xl', delay: 0.2 },
    { emoji: '💫', bottom: '40%', left: '10%', size: 'text-xl', delay: 0.6 },
    { emoji: '🎀', top: '60%', right: '12%', size: 'text-2xl', delay: 0.4 },
    { emoji: '🌷', bottom: '15%', left: '15%', size: 'text-2xl', delay: 0.3 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 渐变背景层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cute-pink/5" />
      
      {/* 圆形装饰 */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cute-pink/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-secondary/5 rounded-full blur-2xl" />
      
      {/* 手绘风格虚线装饰 */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-foreground" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      
      {/* 浮动emoji装饰 */}
      {decorations.map((deco, i) => (
        <motion.div
          key={i}
          className={`absolute ${deco.size} opacity-20`}
          style={{
            top: deco.top,
            left: deco.left,
            right: deco.right,
            bottom: deco.bottom,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [-5, 5, -5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: deco.delay,
            ease: "easeInOut",
          }}
        >
          {deco.emoji}
        </motion.div>
      ))}
      
      {/* 波浪线条 */}
      <svg className="absolute bottom-0 left-0 w-full h-32 opacity-5" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <motion.path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill="currentColor"
          className="text-primary"
          animate={{
            d: [
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
              "M0,60 C240,0 480,120 720,60 C960,0 1200,120 1440,60 L1440,120 L0,120 Z",
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  )
}
