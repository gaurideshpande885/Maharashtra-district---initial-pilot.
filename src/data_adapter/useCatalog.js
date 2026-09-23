// src/hooks/useCatalog.js
import { useState, useEffect, useCallback } from 'react'

const API = import.meta.env.VITE_API_BASE_URL

export function useCatalog(estate = 'maharashtra') {
  const [catalog, setCatalog] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCatalog = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch(`${API}/catalog?state=${estate}`, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
      })
      if (!r.ok) throw new Error(`catalog ${r.status}`)
      setCatalog(await r.json())
    } catch (e) {
      setError(e.message) // never silently fall back to a stale hardcoded list
    } finally {
      setLoading(false)
    }
  }, [estate])

  useEffect(() => { fetchCatalog() }, [fetchCatalog])

  return { catalog, loading, error, retry: fetchCatalog }
}