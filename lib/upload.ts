// If this file isn't being used, we can delete it
// Otherwise, remove unused imports:
// import { writeFile } from 'fs/promises'
// import path from 'path'

// Add API_URL constant
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function uploadFile(file: Buffer, filename: string) {
  const formData = new FormData()
  const blob = new Blob([file], { type: 'application/pdf' })
  formData.append('file', blob, filename)

  // Get token from localStorage
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })

  const data = await response.json()
  return data.url
} 