'use client'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { DatasetCard } from './datasetcard'
import { datasetsIndex } from '@/lib/meilisearch'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/use-debounce'

interface Dataset {
  id: string
  title: string
  imageSrc: string
  // Add other fields you have in your dataset
}

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState('')
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    async function performSearch() {
      setLoading(true)
      try {
        if (debouncedSearch) {
          const results = await datasetsIndex.search(debouncedSearch)
          setDatasets(results.hits as Dataset[])
        } else {
          // Get all documents when no search query
          const results = await datasetsIndex.getDocuments()
          setDatasets(results.results as Dataset[])
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [debouncedSearch])

  return (
    <div className="h-full flex flex-col space-y-4 p-4">
      <div className="relative p-4 shrink-0">
        <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search dataset"
          className="pl-10 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-auto px-4">
        {loading ? (
          <div className="flex justify-center">Loading...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {datasets.map((dataset) => (
              <DatasetCard
                key={dataset.id}
                title={dataset.title}
                imageSrc={dataset.imageSrc}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
