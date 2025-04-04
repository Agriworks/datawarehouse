'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MapViewProps } from '@/lib/types'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'

// Helper function to get color based on magnitude
function getMagnitudeColor(magnitude: number): string {
  if (magnitude <= 2) return '#00ff00'
  if (magnitude <= 4) return '#ffff00'
  if (magnitude <= 6) return '#ffa500'
  return '#ff0000'
}

// Helper function to get radius based on magnitude
function getMagnitudeRadius(magnitude: number): number {
  return Math.max(6, Math.min(magnitude * 3, 15))
}

export function MapView({ data }: MapViewProps) {
  const [mounted, setMounted] = useState(false)

  // Handle hydration issues with Next.js
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const center: [number, number] = [20, 0]

  return (
    <Card className="h-full">
      <CardHeader className="flex-none">
        <CardTitle>Earthquake Locations</CardTitle>
        <CardDescription>
          Geographical distribution of earthquakes. Circle size and color
          indicate magnitude.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 relative h-[500px] p-0">
        <div className="absolute inset-0">
          <MapContainer
            center={center}
            zoom={2}
            className="h-full w-full rounded-md"
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((quake) => (
              <CircleMarker
                key={quake._id}
                center={[quake.Latitude, quake.Longitude]}
                radius={getMagnitudeRadius(quake.Mag)}
                fillColor={getMagnitudeColor(quake.Mag)}
                color={getMagnitudeColor(quake.Mag)}
                weight={1}
                opacity={0.8}
                fillOpacity={0.6}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-medium">{quake.Place}</p>
                    <p>Magnitude: {quake.Mag.toFixed(1)}</p>
                    <p>Time: {new Date(quake.Time).toLocaleString()}</p>
                    <p>
                      Location: {quake.Latitude.toFixed(4)},{' '}
                      {quake.Longitude.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}
