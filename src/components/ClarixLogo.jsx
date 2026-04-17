/**
 * ClarixLogo — Animated brand logo
 *
 * Props
 *   size        : "sm" | "md" | "lg"  (default "md")
 *   showSubtitle: boolean              (default true)
 *   showIcon    : boolean              (default true)
 *   loop        : boolean              (default true)  idle animations
 */

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

/* ── Constants ──────────────────────────────────────────────────────────── */

const LETTERS = ['C', 'L', 'A', 'R', 'I', 'X']

// Luxury easing: fast out of gate, gentle settle
const EASE = [0.22, 1, 0.36, 1]

const SIZES = {
  sm: {
    wordmark:    '1.5rem',
    tracking:    '0.14em',
    sub:         '0.5rem',
    subTracking: '0.22em',
    iconW:       20,
    barH:        3,
    barGap:      4,
    iconGap:     10,
    lineH:       1.5,
    lineTop:     6,
    subTop:      4,
  },
  md: {
    wordmark:    '2.25rem',
    tracking:    '0.16em',
    sub:         '0.62rem',
    subTracking: '0.24em',
    iconW:       30,
    barH:        4,
    barGap:      5,
    iconGap:     15,
    lineH:       2,
    lineTop:     7,
    subTop:      5,
  },
  lg: {
    wordmark:    '3.5rem',
    tracking:    '0.18em',
    sub:         '0.84rem',
    subTracking: '0.28em',
    iconW:       44,
    barH:        5.5,
    barGap:      7,
    iconGap:     20,
    lineH:       2.5,
    lineTop:     9,
    subTop:      6,
  },
}

// Three stacked signal bars (top = widest, most opaque)
const BARS = [
  { pct: 1,    baseOpacity: 1    },
  { pct: 0.68, baseOpacity: 0.68 },
  { pct: 0.42, baseOpacity: 0.44 },
]

/* ── Component ──────────────────────────────────────────────────────────── */

export default function ClarixLogo({
  size         = 'md',
  showSubtitle = true,
  showIcon     = true,
  loop         = true,
}) {
  const s = SIZES[size] ?? SIZES.md

  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: '0px 0px -20px 0px' })

  // Animation controllers
  const shimmerCtrl  = useAnimation()
  const lineCtrl     = useAnimation()
  const subtitleCtrl = useAnimation()
  const barsCtrl     = useAnimation()

  /* ── Inject Syne from Google Fonts (once per page) ── */
  useEffect(() => {
    const FONT_ID = 'clarix-syne-font-link'
    if (document.getElementById(FONT_ID)) return
    const link = document.createElement('link')
    link.id   = FONT_ID
    link.rel  = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap'
    document.head.appendChild(link)
  }, [])

  /* ── Animation sequence triggered on inView ── */
  useEffect(() => {
    if (!inView) return

    let alive      = true
    let pendingTimer = null
    let loopTimer    = null

    // Utility: awaitable delay that can be cancelled on unmount
    const wait = (ms) =>
      new Promise((resolve) => {
        pendingTimer = setTimeout(resolve, ms)
      })

    // One shimmer sweep: slide x from far-left → far-right, then reset
    const doShimmer = async () => {
      if (!alive) return
      shimmerCtrl.set({ x: '-115%' })
      await shimmerCtrl.start({
        x: '215%',
        transition: { duration: 0.7, ease: EASE },
      })
      if (alive) shimmerCtrl.set({ x: '-115%' })
    }

    const run = async () => {
      /* 1 ── Icon bars slide in (parallel to letter reveal) */
      if (showIcon) {
        barsCtrl.start((i) => ({
          x: 0,
          opacity: BARS[i].baseOpacity,
          transition: {
            duration: 0.5,
            delay: i * 0.1,
            ease: EASE,
          },
        }))
      }

      /* 2 ── Accent line draws in at ~550 ms
              (C L A have landed; R I X still mid-flight → cinematic) */
      await wait(550)
      if (!alive) return

      lineCtrl.start({
        scaleX: 1,
        transition: { duration: 0.52, ease: EASE },
      })

      /* 3 ── Subtitle rises up alongside the line draw */
      subtitleCtrl.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.52, ease: EASE },
      })

      /* 4 ── First shimmer sweep after all letters have settled */
      await wait(420)
      if (!alive) return
      await doShimmer()
      if (!alive) return

      /* 5 ── Idle loop (if enabled) */
      if (loop) {
        // Accent line breathes
        lineCtrl.start({
          opacity: [0.5, 1, 0.5],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        })

        // Icon bars pulse with staggered timing for a wave effect
        if (showIcon) {
          barsCtrl.start((i) => ({
            opacity: [
              BARS[i].baseOpacity,
              Math.min(1, BARS[i].baseOpacity * 2.1),
              BARS[i].baseOpacity,
            ],
            transition: {
              duration: 2.6,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }))
        }

        // Shimmer auto-repeats every 6 s
        loopTimer = setInterval(() => {
          if (alive) doShimmer()
        }, 6000)
      }
    }

    run()

    return () => {
      alive = false
      clearTimeout(pendingTimer)
      if (loopTimer) clearInterval(loopTimer)
    }
  }, [inView, loop, showIcon]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Per-letter masked slide-up variants ── */
  const letterVariants = {
    hidden: { y: '115%', opacity: 1 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.54,
        delay: i * 0.08,
        ease: EASE,
      },
    }),
  }

  /* ── Render ── */
  return (
    <div
      ref={containerRef}
      style={{
        display:       'inline-flex',
        flexDirection: 'column',
        alignItems:    'flex-start',
      }}
    >

      {/* ─────────────────────── Top row: icon + wordmark ─────────────────── */}
      <div
        style={{
          display:     'flex',
          alignItems:  'center',
          gap:         showIcon ? s.iconGap : 0,
        }}
      >

        {/* ── Signal-bars icon ── */}
        {showIcon && (
          <div
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           s.barGap,
              width:         s.iconW,
              // nudge down so bars align with wordmark optical center
              paddingTop:    4,
            }}
          >
            {BARS.map((bar, i) => (
              <motion.div
                key={i}
                custom={i}
                animate={barsCtrl}
                initial={{ x: -18, opacity: 0 }}
                style={{
                  width:         `${bar.pct * 100}%`,
                  height:        s.barH,
                  borderRadius:  999,
                  background:    'linear-gradient(90deg, #2B68E9 0%, #7AB3FF 100%)',
                  transformOrigin: 'left center',
                }}
              />
            ))}
          </div>
        )}

        {/* ── Wordmark + shimmer ── */}
        <div style={{ position: 'relative' }}>

          {/* Letters — each wrapped in an overflow:hidden mask so the
              slide-up animation looks like the letter is being revealed */}
          <div
            style={{
              display:     'flex',
              fontFamily:  "'Syne', system-ui, sans-serif",
              fontSize:    s.wordmark,
              fontWeight:  800,
              letterSpacing: s.tracking,
              lineHeight:  1,
            }}
          >
            {LETTERS.map((ltr, i) => (
              <span
                key={i}
                style={{
                  display:    'inline-block',
                  overflow:   'hidden',
                  // extra bottom space so descenders/tails don't clip
                  lineHeight: 1.2,
                }}
              >
                <motion.span
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  style={{
                    display: 'inline-block',
                    // "X" gets the brand accent; rest go white → pale-blue
                    background:
                      i === LETTERS.length - 1
                        ? 'linear-gradient(160deg, #7AB3FF 0%, #2B68E9 100%)'
                        : 'linear-gradient(160deg, #FFFFFF 15%, #C8DCFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip:      'text',
                  }}
                >
                  {ltr}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Shimmer overlay — absolutely positioned, clipped to wordmark box */}
          <div
            style={{
              position:      'absolute',
              inset:         0,
              overflow:      'hidden',
              pointerEvents: 'none',
              // Raise above letters so mixBlendMode acts on them
              zIndex:        2,
            }}
          >
            <motion.div
              animate={shimmerCtrl}
              initial={{ x: '-115%' }}
              style={{
                position: 'absolute',
                inset:    0,
                background:
                  'linear-gradient(105deg, transparent 18%, rgba(255,255,255,0.46) 43%, rgba(122,179,255,0.32) 52%, transparent 70%)',
                mixBlendMode: 'screen',
              }}
            />
          </div>

        </div>
      </div>

      {/* ─────────────────────── Accent line ─────────────────────────────── */}
      <motion.div
        animate={lineCtrl}
        initial={{ scaleX: 0, opacity: 1 }}
        style={{
          height:          s.lineH,
          width:           '100%',
          marginTop:       s.lineTop,
          background:
            'linear-gradient(90deg, #2B68E9 0%, #7AB3FF 55%, rgba(122,179,255,0) 100%)',
          borderRadius:    999,
          transformOrigin: 'left center',
        }}
      />

      {/* ─────────────────────── Subtitle ────────────────────────────────── */}
      {showSubtitle && (
        <motion.div
          animate={subtitleCtrl}
          initial={{ opacity: 0, y: 8 }}
          style={{
            marginTop:     s.subTop,
            fontFamily:    "'Syne', system-ui, sans-serif",
            fontSize:      s.sub,
            fontWeight:    600,
            letterSpacing: s.subTracking,
            textTransform: 'uppercase',
            color:         'rgba(91, 143, 249, 0.72)',
            whiteSpace:    'nowrap',
            userSelect:    'none',
          }}
        >
          DATA · DASHBOARDS · WEBSITES
        </motion.div>
      )}

    </div>
  )
}
