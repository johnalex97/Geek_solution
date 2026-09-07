import { motion, useReducedMotion } from 'motion/react'

export function useRevealMotion() {
  const reduceMotion = useReducedMotion()
  return reduceMotion
    ? { initial: false }
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.55 } }
}

export const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export const MotionDiv = motion.div
export const MotionArticle = motion.article
export const MotionSection = motion.section
