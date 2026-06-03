import { Variants } from 'framer-motion'

// Animasyonlar için güvenli varsayılan ayarlar
export const animationConfig = {
  // Viewport ayarları - once: false ile her zaman animasyon çalışır
  viewport: {
    once: false, // Animasyonun sadece bir kere çalışmasını kapatıyoruz
    amount: 0.1, // %10 görününce animasyon başlar
    margin: "100px" // 100px önceden animasyonu tetikle
  },
  // Daha hızlı animasyonlar
  transition: {
    duration: 0.3, // 0.6'dan 0.3'e düşürüldü
    ease: "easeOut"
  }
}

// Fade In animasyonu
export const fadeInUp: Variants = {
  initial: {
    opacity: 0.7, // 0 yerine 0.7 başlangıç opacity
    y: 10 // 20 yerine 10px yukarıdan başla
  },
  animate: {
    opacity: 1,
    y: 0
  }
}

// Container animasyonu (stagger efekti için)
export const containerVariants: Variants = {
  initial: {
    opacity: 0.8 // 0 yerine 0.8 başlangıç
  },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.1, // 0.2'den 0.1'e düşürüldü
      staggerChildren: 0.05 // 0.1'den 0.05'e düşürüldü
    }
  }
}

// Item animasyonu (container içindeki elemanlar için)
export const itemVariants: Variants = {
  initial: {
    opacity: 0.7,
    y: 10
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}

// Hızlı görünüm için animasyonsuz versiyon
export const noAnimation = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  transition: { duration: 0 }
}