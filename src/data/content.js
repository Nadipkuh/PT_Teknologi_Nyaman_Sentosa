import {
  Cpu,
  FlaskConical,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  Rocket,
  TrendingUp,
} from 'lucide-react'

// Resolves files in /public, also when the site is served from a sub-path (GitHub Pages).
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const COMPANY = {
  name: 'PT. Teknologi Nyaman Sentosa',
  nameUpper: 'PT. TEKNOLOGI NYAMAN SENTOSA',
  short: 'TNS',
  slogan: 'Make Your Dream Comfort',
}

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'vision', label: 'Vision & Mission' },
  { id: 'products', label: 'Products' },
  { id: 'contact', label: 'Contact' },
]

export const CHAIRMAN = {
  name: 'Alif Fatih Hidayat',
  role: 'Chairman',
  quote: 'Semangat Berjuang. SUKSES.',
  photo: 'images/chairman.jpg',
}

export const TEAM = [
  { name: 'Daffa Adli', role: 'PR Manager', initials: 'DA', icon: Megaphone },
  { name: 'Yuliandri', role: 'Researcher', initials: 'YU', icon: FlaskConical },
  { name: 'Amri Ihsan Yasa', role: 'Researcher', initials: 'AY', icon: FlaskConical },
  { name: 'Maulana Nadhif Alwahas', role: 'Marketing', initials: 'MN', icon: TrendingUp },
]

export const VALUES = [
  {
    title: 'Creativity',
    text: 'Encouraging new ideas and solutions.',
    icon: Lightbulb,
  },
  {
    title: 'Technology',
    text: 'Continuous development and growth opportunities.',
    icon: Cpu,
  },
  {
    title: 'Comfort',
    text: 'Make your life easier.',
    icon: HeartHandshake,
  },
  {
    title: 'Innovation',
    text: 'Creating future-driven solutions.',
    icon: Rocket,
  },
]

export const CONTACT = {
  person: 'Daffa Adli',
  role: 'PR Manager',
  email: 'contact@yourdreamisreal.com',
  phone: '+62 21 1234 5678',
  phoneHref: 'tel:+622112345678',
  website: 'www.yourdreamisreal.com',
  websiteHref: 'https://www.yourdreamisreal.com',
}

// Placeholder links: swap for the real TNS accounts.
export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'YouTube', href: 'https://www.youtube.com/' },
]
