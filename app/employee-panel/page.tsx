'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RESEARCH_CATEGORIES } from '@/lib/constants'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useAuth } from '@/lib/hooks/useAuth'

type SubmissionStep = 'draft' | 'review' | 'success'

interface Paper {
  id: string
  title: string
  description: string
  category: string
  abstract: string
  author: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
  url: string
}

interface ProfileData {
  name?: string
  phone?: string
  bio?: string
  expertise?: string[]
  publications?: string[]
  education?: string[]
  links?: string[]
  image?: string | null
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://perrin-production.up.railway.app'

export default function EmployeePanel() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [step, setStep] = useState<SubmissionStep>('draft')
  const [papers, setPapers] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Economic Policy',
    abstract: '',
    file: null as File | null,
  })

  useEffect(() => {
    if (isAuthenticated) {
      fetchPapers()
    }
  }, [isAuthenticated])

  const fetchPapers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/admin/papers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setPapers(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching papers:', error)
      setPapers([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'draft') {
      setStep('review')
      return
    }

    if (step === 'review' && formData.file) {
      const form = new FormData()
      form.append('file', formData.file)
      form.append('title', formData.title)
      form.append('description', formData.description)
      form.append('category', formData.category)
      form.append('abstract', formData.abstract)

      try {
        const token = localStorage.getItem('token')
        // Don't set Content-Type header - browser will set it with boundary for FormData
        const response = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: form
        })

        if (response.ok) {
          const paper = await response.json()
          console.log('Upload successful:', paper)
          setStep('success')
          fetchPapers()
          // Reset form
          setFormData({
            title: '',
            description: '',
            category: 'Economic Policy',
            abstract: '',
            file: null,
          })
        } else {
          const error = await response.json()
          console.error('Upload failed:', error)
          alert('Error uploading research: ' + (error.message || 'Unknown error'))
        }
      } catch (error) {
        console.error('Error uploading:', error)
        alert('Network error while uploading. Please try again.')
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const updateProfile = async (profileData: ProfileData) => {
    try {
      const token = localStorage.getItem('token')
      const email = localStorage.getItem('userEmail')
      
      if (!token || !email) {
        throw new Error('Not authenticated')
      }

      console.log('Updating profile:', { email, ...profileData })

      const response = await fetch(`${API_URL}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...profileData,
          email
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update profile')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error saving profile:', error)
      throw error
    }
  }

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  if (isLoading) return (
    <div className="bg-gray-50">
      <div className="relative h-[30vh] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
            <h1 className="text-4xl font-serif font-bold text-white">Employee Dashboard</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[30vh] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
            <h1 className="text-4xl font-serif font-bold text-white">Employee Dashboard</h1>
            <p className="mt-2 text-gray-300">Upload and manage your research publications</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {step === 'success' ? (
              <div className="bg-white shadow-sm p-8 text-center">
                <div className="text-green-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Research Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Your research paper has been submitted and is pending review.
                </p>
                <button
                  onClick={() => setStep('draft')}
                  className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700"
                >
                  Submit Another Paper
                </button>
              </div>
            ) : (
              <div className="bg-white shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {step === 'draft' ? 'Submit New Research' : 'Review Submission'}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className={step === 'draft' ? 'text-blue-600 font-bold' : ''}>Draft</span>
                    <span>→</span>
                    <span className={step === 'review' ? 'text-blue-600 font-bold' : ''}>Review</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Research Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      disabled={step === 'review'}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent outline-none transition-colors disabled:bg-gray-50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      disabled={step === 'review'}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent outline-none transition-colors disabled:bg-gray-50"
                      required
                    >
                      {RESEARCH_CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brief Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      disabled={step === 'review'}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent outline-none transition-colors disabled:bg-gray-50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Abstract
                    </label>
                    <textarea
                      value={formData.abstract}
                      onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
                      disabled={step === 'review'}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent outline-none transition-colors disabled:bg-gray-50"
                      required
                    />
                  </div>

                  {step === 'draft' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PDF File
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full"
                        required
                      />
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    {step === 'review' && (
                      <button
                        type="button"
                        onClick={() => setStep('draft')}
                        className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Back to Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {step === 'draft' ? 'Review Submission' : 'Submit Research'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Submissions List */}
          <div className="space-y-4">
            <div className="bg-white shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Submissions</h2>
              {papers.length === 0 ? (
                <p className="text-gray-500">No submissions yet</p>
              ) : (
                <div className="space-y-4">
                  {papers.map(paper => (
                    <div key={paper.id} className="border-l-4 border-blue-600 pl-4">
                      <h3 className="font-medium">{paper.title}</h3>
                      <div className="flex justify-between items-center mt-1 text-sm">
                        <span className="text-gray-600">
                          {new Date(paper.date).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          paper.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : paper.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                        </span>
                      </div>
                      {paper.url && (
                        <a 
                          href={paper.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-500 text-sm mt-2 inline-block"
                        >
                          View PDF →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 