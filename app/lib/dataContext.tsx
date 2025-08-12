'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface SiteData {
  hero?: any
  about?: any
  concerts?: any[]
  recordings?: any[]
  gallery?: any
  press?: any
  contact?: any
  navigation?: any
  footer?: any
}

interface DataContextType {
  data: SiteData
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

interface DataProviderProps {
  children: ReactNode
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<SiteData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAllData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all data in parallel for better performance
      const [
        heroRes,
        aboutRes,
        concertsRes,
        recordingsRes,
        galleryRes,
        pressRes,
        contactRes,
        navigationRes,
        footerRes
      ] = await Promise.allSettled([
        fetch('/api/hero'),
        fetch('/api/about'),
        fetch('/api/concerts'),
        fetch('/api/recordings'),
        fetch('/api/gallery'),
        fetch('/api/press'),
        fetch('/api/contact'),
        fetch('/api/settings?type=navigation'),
        fetch('/api/settings?type=footer')
      ])

      const siteData: SiteData = {}

      // Process results and handle failures gracefully
      if (heroRes.status === 'fulfilled' && heroRes.value.ok) {
        siteData.hero = await heroRes.value.json()
      }
      if (aboutRes.status === 'fulfilled' && aboutRes.value.ok) {
        siteData.about = await aboutRes.value.json()
      }
      if (concertsRes.status === 'fulfilled' && concertsRes.value.ok) {
        siteData.concerts = await concertsRes.value.json()
      }
      if (recordingsRes.status === 'fulfilled' && recordingsRes.value.ok) {
        siteData.recordings = await recordingsRes.value.json()
      }
      if (galleryRes.status === 'fulfilled' && galleryRes.value.ok) {
        siteData.gallery = await galleryRes.value.json()
      }
      if (pressRes.status === 'fulfilled' && pressRes.value.ok) {
        siteData.press = await pressRes.value.json()
      }
      if (contactRes.status === 'fulfilled' && contactRes.value.ok) {
        siteData.contact = await contactRes.value.json()
      }
      if (navigationRes.status === 'fulfilled' && navigationRes.value.ok) {
        siteData.navigation = await navigationRes.value.json()
      }
      if (footerRes.status === 'fulfilled' && footerRes.value.ok) {
        siteData.footer = await footerRes.value.json()
      }

      setData(siteData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
      console.error('Error loading site data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  const value: DataContextType = {
    data,
    loading,
    error,
    refetch: fetchAllData
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}