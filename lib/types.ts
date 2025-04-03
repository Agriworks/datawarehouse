export interface EarthquakeData {
  _id: string
  Place: string
  Mag: number
  Time: string
  Latitude: number
  Longitude: number
}

export interface TableViewProps {
  data: EarthquakeData[]
}

export interface GraphViewProps {
  data: EarthquakeData[]
}

export interface MapViewProps {
  data: EarthquakeData[]
}
