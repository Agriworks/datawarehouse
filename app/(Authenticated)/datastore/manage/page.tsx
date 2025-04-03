'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search, Download, BarChart2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { EarthquakeData } from '@/lib/types'

const chartConfig = {
  magnitude: {
    label: 'Magnitude',
    color: 'hsl(var(--chart-1))',
  },
}

export default function Manage() {
  const [earthquakeData, setEarthquakeData] = useState<EarthquakeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchEarthquakeData() {
      try {
        const response = await fetch('/api/earthquakes')
        if (!response.ok) {
          throw new Error('Failed to fetch earthquake data')
        }
        const data = await response.json()
        console.log('Fetched data:', data)
        setEarthquakeData(data)
      } catch (err) {
        console.error('Error:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchEarthquakeData()
  }, [])

  const filteredData = earthquakeData.filter((quake) =>
    quake.Place.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search earthquakes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <BarChart2 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : loading ? (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="graph">Graph View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Magnitude</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Latitude</TableHead>
                    <TableHead>Longitude</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((quake) => (
                    <TableRow key={quake._id}>
                      <TableCell>{quake.Place}</TableCell>
                      <TableCell>{quake.Mag.toFixed(1)}</TableCell>
                      <TableCell>
                        {new Date(quake.Time).toLocaleString()}
                      </TableCell>
                      <TableCell>{quake.Latitude.toFixed(4)}</TableCell>
                      <TableCell>{quake.Longitude.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="graph">
            <Card>
              <CardHeader>
                <CardTitle>Earthquake Magnitude by Location</CardTitle>
                <CardDescription>
                  Distribution of earthquake magnitudes across different
                  locations
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ChartContainer config={chartConfig}>
                  <BarChart
                    data={filteredData}
                    margin={{ top: 20, right: 30, left: 40, bottom: 100 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="Place"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      dataKey="Mag"
                      label={{
                        value: 'Magnitude',
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' },
                      }}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(label) => `Location: ${label}`}
                          formatter={(value) => [
                            `Magnitude: ${Number(value).toFixed(1)}`,
                          ]}
                        />
                      }
                    />
                    <Bar
                      dataKey="Mag"
                      fill="hsl(var(--chart-1))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="map">
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
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
