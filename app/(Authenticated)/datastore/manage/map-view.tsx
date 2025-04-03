import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MapViewProps } from '@/lib/types'

export function MapView({ data }: MapViewProps) {
  console.log(data)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earthquake Locations</CardTitle>
        <CardDescription>
          Geographical distribution of earthquakes
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[500px]">
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-md">
          Map View Coming Soon
        </div>
      </CardContent>
    </Card>
  )
}
