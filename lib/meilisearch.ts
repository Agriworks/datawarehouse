import { MeiliSearch } from 'meilisearch'

if (!process.env.NEXT_PUBLIC_MEILISEARCH_URL) {
  throw new Error('NEXT_PUBLIC_MEILISEARCH_URL is not defined')
}

if (!process.env.NEXT_PUBLIC_MEILISEARCH_KEY) {
  throw new Error('NEXT_PUBLIC_MEILISEARCH_KEY is not defined')
}

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_KEY,
})

export const datasetsIndex = client.index('movies')
