'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { month: 'January', farmers: 1250, cropYield: 850 },
  { month: 'February', farmers: 1580, cropYield: 920 },
  { month: 'March', farmers: 1890, cropYield: 1150 },
  { month: 'April', farmers: 2100, cropYield: 1680 },
  { month: 'May', farmers: 2450, cropYield: 1890 },
  { month: 'June', farmers: 2780, cropYield: 2100 },
]

const chartConfig = {
  farmers: {
    label: 'Registered Farmers',
    color: 'hsl(var(--chart-1))',
  },
  cropYield: {
    label: 'Crop Yield (tons)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export default function dashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agricultural Growth Trends</CardTitle>
        <CardDescription>
          Showing farmer registration and crop yield for last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="cropYield"
              type="natural"
              fill="var(--color-cropYield)"
              fillOpacity={0.4}
              stroke="var(--color-cropYield)"
              stackId="a"
            />
            <Area
              dataKey="farmers"
              type="natural"
              fill="var(--color-farmers)"
              fillOpacity={0.4}
              stroke="var(--color-farmers)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Growth rate increased by 13.4% <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing agricultural growth metrics for 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
