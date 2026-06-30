import { useEffect, useState, useCallback, useRef } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import '../../Home/Hero/Hero.scss'

// Skeleton loader
const SkeletonLoader = () => (
  <section className="hero hero--loading">
    <div className="hero__container">
      <div className="hero__content">
        <div className="hero__title skeleton skeleton--title" />
        <div className="hero__description skeleton skeleton--text" />

        <div className="hero__features">
          {[1, 2, 3].map((i) => (
            <div key={i} className="hero__feature skeleton skeleton--feature" />
          ))}
        </div>

        <div className="hero__buttons">
          <div className="hero__btn skeleton skeleton--btn" />
          <div className="hero__btn skeleton skeleton--btn" />
        </div>
      </div>

      <div className="hero__media">
        <div className="hero__media-wrapper">
          <div className="hero__image skeleton skeleton--media" />
        </div>
      </div>
    </div>
  </section>
)

const Hero = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [imageError, setImageError] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [showVideo, setShowVideo] = useState(false) // controls video visibility

  const abortControllerRef = useRef(null)
  const videoRef = useRef(null) // Video elementini ushlab turish uchun ref

  // FETCH DATA
  const fetchHero = useCallback(async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      setLoading(true)
      setError(null)
      setImageError(false)
      setVideoError(false)
      setShowVideo(false)

      const response = await axios.get('/db.json', {
        signal: abortControllerRef.current.signal,
      })

      setData(response.data.hero)
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError('Maʼlumotlarni yuklashda xatolik yuz berdi.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      await fetchHero()
    })()
    return () => abortControllerRef.current?.abort()
  }, [fetchHero])

  // SCROLL KUZATUVCHI EFFECT (Intersection Observer)
  useEffect(() => {
    // Agar video yoqilmagan bo'lsa yoki video elementi hali yuklanmagan bo'lsa, kuzatmaymiz
    if (!showVideo || !videoRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Agar video ekrandan chiqib ketsa (isIntersecting false bo'lsa) uni pauza qilamiz
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause()
        }
      },
      {
        threshold: 0.1, // Videoning 10% qismi ko'rinmay qolsa, effekt ishga tushadi
      }
    )

    observer.observe(videoRef.current)

    // Komponent o'chganda (unmount) kuzatuvchini tozalaymiz
    return () => {
      observer.disconnect()
    }
  }, [showVideo])

  // ANIMATIONS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  }

  const mediaVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.7 } },
  }

  const statVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: 0.4 + i * 0.1, duration: 0.5 },
    }),
  }

  // HANDLE PLAY BUTTON CLICK
  const handlePlayClick = () => {
    if (data?.video && !videoError) {
      setShowVideo(true)
    }
  }

  // MEDIA LOGIC: image first + play button, then video on click
  const renderMedia = () => {
    const videoUrl = data?.video
    const imageUrl = data?.image

    // 1. VIDEO (when play button clicked and no error)
    if (videoUrl && showVideo && !videoError) {
      return (
        <video
          ref={videoRef} // Ref shu yerga ulandi
          src={videoUrl}
          autoPlay
          controls // ovozni boshqarish paneli
          loop
          playsInline
          className="hero__video"
          onError={() => {
            setVideoError(true)
            setShowVideo(false)
          }}
          poster={imageUrl}
        />
      )
    }

    // 2. IMAGE with play button overlay (if video exists and not playing yet)
    if (videoUrl && !videoError && imageUrl && !imageError) {
      return (
        <div className="hero__media-overlay-wrapper">
          <img
            src={imageUrl}
            alt={data?.title?.replace(/<[^>]*>/g, '') || 'Hero image'}
            className="hero__image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
          <button
            className="hero__play-btn"
            onClick={handlePlayClick}
            aria-label="Play video"
          >
            <span className="hero__play-icon">▶</span>
          </button>
        </div>
      )
    }

    // 3. IMAGE only (no video, or video failed)
    if (imageUrl && !imageError) {
      return (
        <img
          src={imageUrl}
          alt={data?.title?.replace(/<[^>]*>/g, '') || 'Hero image'}
          className="hero__image"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      )
    }

    // 4. FINAL PLACEHOLDER
    return <div className="hero__placeholder">🎬</div>
  }

  if (loading) return <SkeletonLoader />

  if (error) {
    return (
      <section className="hero hero--error">
        <div className="hero__error-container">
          <div className="hero__error-icon">⚠️</div>
          <div className="hero__error">{error}</div>
          <button className="hero__retry-btn" onClick={fetchHero}>
            Qayta urinish
          </button>
        </div>
      </section>
    )
  }

  if (!data) return null

  const { title, description, features, buttons, stats } = data

  return (
    <section className="hero" aria-label="Hero section">
      {/* BACKGROUND */}
      <div className="hero__bg-decoration">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
      </div>

      <div className="hero__container">
        {/* LEFT CONTENT */}
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="hero__title"
            dangerouslySetInnerHTML={{ __html: title }}
            variants={itemVariants}
          />

          <motion.p className="hero__description" variants={itemVariants}>
            {description}
          </motion.p>

          <motion.ul className="hero__features" variants={containerVariants}>
            {features?.map((item, i) => (
              <motion.li
                key={i}
                className="hero__feature"
                variants={itemVariants}
              >
                <span className="hero__feature-check">✓</span>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div className="hero__buttons" variants={itemVariants}>
            {buttons?.map((btn, i) => {
              const isRegisterButton = i === 1

              if (isRegisterButton) {
                return (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault()
                      console.log('Register button clicked, dispatching event')
                      window.dispatchEvent(
                        new CustomEvent('openRegistrationModal')
                      )
                    }}
                    className={`hero__btn hero__btn--${i === 0 ? 'primary' : 'secondary'}`}
                  >
                    {btn.text}
                  </button>
                )
              }

              return (
                <a
                  key={i}
                  href={btn.link}
                  className={`hero__btn hero__btn--${i === 0 ? 'primary' : 'secondary'}`}
                >
                  {btn.text}
                </a>
              )
            })}
          </motion.div>
        </motion.div>

        {/* RIGHT MEDIA */}
        <motion.div
          className="hero__media"
          variants={mediaVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero__media-wrapper">{renderMedia()}</div>

          {stats?.length > 0 && (
            <div className="hero__stats">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="hero__stat"
                  custom={i}
                  variants={statVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="hero__stat-icon">{s.icon}</span>
                  <span className="hero__stat-title">{s.title}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero