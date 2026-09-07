import { Link } from 'react-router-dom'

const variants = {
  primary: 'border border-[#007a3f] bg-[var(--geek-green)] text-[var(--ink)] hover:bg-[#008f4c] active:translate-y-px',
  secondary: 'border border-[#007a3f] bg-white text-[var(--ink)] hover:text-[#007a3f]',
  portal: 'bg-[var(--ink)] text-white hover:bg-[var(--graphite)]',
}

export function ActionButton({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-[transform,background-color,border-color,color] ${variants[variant]} ${className}`
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} className={classes} {...props}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
