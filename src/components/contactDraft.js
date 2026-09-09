import { createContext } from 'react'

export const initialContactForm = { name: '', email: '', phone: '', audience: '', message: '', website: '' }
export const ContactDraftContext = createContext(null)
