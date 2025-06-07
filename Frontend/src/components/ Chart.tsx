"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export const description = "An interactive area chart for e-commerce metrics"

const chartData = [
  { date: "2024-04-01", sales: 2225, revenue: 3330 },
  { date: "2024-04-02", sales: 973, revenue: 1455 },
  { date: "2024-04-03", sales: 1637, revenue: 2505 },
  { date: "2024-04-04", sales: 2342, revenue: 3630 },
  { date: "2024-04-05", sales: 3373, revenue: 5595 },
  { date: "2024-04-06", sales: 3301, revenue: 4515 },
  { date: "2024-04-07", sales: 2345, revenue: 3675 },
  { date: "2024-04-08", sales: 4309, revenue: 6135 },
  { date: "2024-04-09", sales: 539, revenue: 885 },
  { date: "2024-04-10", sales: 2361, revenue: 3915 },
  { date: "2024-04-11", sales: 3327, revenue: 4905 },
  { date: "2024-04-12", sales: 2932, revenue: 4380 },
  { date: "2024-04-13", sales: 3342, revenue: 5130 },
  { date: "2024-04-14", sales: 1337, revenue: 2055 },
  { date: "2024-04-15", sales: 1320, revenue: 1800 },
  { date: "2024-04-16", sales: 1338, revenue: 2070 },
  { date: "2024-04-17", sales: 4346, revenue: 6690 },
  { date: "2024-04-18", sales: 3364, revenue: 5460 },
  { date: "2024-04-19", sales: 2343, revenue: 3645 },
  { date: "2024-04-20", sales: 899, revenue: 1335 },
  { date: "2024-04-21", sales: 1339, revenue: 2055 },
  { date: "2024-04-22", sales: 2234, revenue: 3360 },
  { date: "2024-04-23", sales: 1383, revenue: 2070 },
  { date: "2024-04-24", sales: 3873, revenue: 5805 },
  { date: "2024-04-25", sales: 2135, revenue: 3225 },
  { date: "2024-04-26", sales: 735, revenue: 1125 },
  { date: "2024-04-27", sales: 3833, revenue: 5745 },
  { date: "2024-04-28", sales: 1232, revenue: 1830 },
  { date: "2024-04-29", sales: 3135, revenue: 4725 },
  { date: "2024-04-30", sales: 4534, revenue: 6810 },
  { date: "2024-05-01", sales: 1365, revenue: 2475 },
  { date: "2024-05-02", sales: 2393, revenue: 4395 },
  { date: "2024-05-03", sales: 2347, revenue: 3705 },
  { date: "2024-05-04", sales: 3835, revenue: 5775 },
  { date: "2024-05-05", sales: 6831, revenue: 7215 },
  { date: "2024-05-06", sales: 4938, revenue: 7470 },
  { date: "2024-05-07", sales: 388, revenue: 5820 },
  { date: "2024-05-08", sales: 1439, revenue: 2235 },
  { date: "2024-05-09", sales: 2237, revenue: 3405 },
  { date: "2024-05-10", sales: 2933, revenue: 4395 },
  { date: "2024-05-11", sales: 3335, revenue: 5025 },
  { date: "2024-05-12", sales: 1937, revenue: 2955 },
  { date: "2024-05-13", sales: 1937, revenue: 2955 },
  { date: "2024-05-14", sales: 4438, revenue: 6720 },
  { date: "2024-05-15", sales: 4733, revenue: 7095 },
  { date: "2024-05-16", sales: 3338, revenue: 5070 },
  { date: "2024-05-17", sales: 4939, revenue: 7485 },
  { date: "2024-05-18", sales: 3135, revenue: 4725 },
  { date: "2024-05-19", sales: 2335, revenue: 3525 },
  { date: "2024-05-20", sales: 1737, revenue: 2655 },
  { date: "2024-05-21", sales: 823, revenue: 1230 },
  { date: "2024-05-22", sales: 813, revenue: 1215 },
  { date: "2024-05-23", sales: 2532, revenue: 3780 },
  { date: "2024-05-24", sales: 2934, revenue: 4410 },
  { date: "2024-05-25", sales: 2031, revenue: 3015 },
  { date: "2024-05-26", sales: 2133, revenue: 3195 },
  { date: "2024-05-27", sales: 4230, revenue: 6300 },
  { date: "2024-05-28", sales: 2333, revenue: 3495 },
  { date: "2024-05-29", sales: 783, revenue: 1170 },
  { date: "2024-05-30", sales: 3430, revenue: 5100 },
  { date: "2024-05-31", sales: 1738, revenue: 2670 },
  { date: "2024-06-01", sales: 1738, revenue: 2670 },
  { date: "2024-06-02", sales: 4730, revenue: 7050 },
  { date: "2024-06-03", sales: 1033, revenue: 1545 },
  { date: "2024-06-04", sales: 4339, revenue: 6585 },
  { date: "2024-06-05", sales: 883, revenue: 1320 },
  { date: "2024-06-06", sales: 2934, revenue: 4410 },
  { date: "2024-06-07", sales: 3233, revenue: 4845 },
  { date: "2024-06-08", sales: 3835, revenue: 5775 },
  { date: "2024-06-09", sales: 4338, revenue: 6570 },
  { date: "2024-06-10", sales: 1535, revenue: 2325 },
  { date: "2024-06-11", sales: 923, revenue: 1380 },
  { date: "2024-06-12", sales: 4936, revenue: 7380 },
  { date: "2024-06-13", sales: 3, revenue: 1215 },
  { date: "2024-06-14", sales: 4236, revenue: 6390 },
  { date: "2024-06-15", sales: 3037, revenue: 4605 },
  { date: "2024-06-16", sales: 3731, revenue: 5565 },
  { date: "2024-06-17", sales: 4735, revenue: 7125 },
  { date: "2024-06-18", sales: 1037, revenue: 1605 },
  { date: "2024-06-19", sales: 3431, revenue: 5115 },
  { date: "2024-06-20", sales: 4038, revenue: 6120 },
  { date: "2024-06-21", sales: 1639, revenue: 2535 },
  { date: "2024-06-22", sales: 3137, revenue: 4755 },
  { date: "2024-06-23", sales: 4830, revenue: 7200 },
  { date: "2024-06-24", sales: 1332, revenue: 1980 },
  { date: "2024-06-25", sales: 1431, revenue: 2115 },
  { date: "2024-06-26", sales: 4334, revenue: 6510 },
  { date: "2024-06-27", sales: 4438, revenue: 6720 },
  { date: "2024-06-28", sales: 1439, revenue: 2235 },
  { date: "2024-06-29", sales: 1033, revenue: 1545 },
  { date: "2024-06-30", sales: 4436, revenue: 6690 }
];

const chartConfig = {
  sales: {
    label: "Sales (Units)",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue ($)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig



export function Chart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0 bg-[#0d0d0d]">
      <CardHeader className="flex items-center gap-2 space-y-0 border-zinc-700 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total sales and revenue for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex "
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 ">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full "
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  formatter={(value, name) => {
                    return name === "Revenue ($)" ? [`$${value}`, name] : [value, name];
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="var(--color-sales)"
              stackId="a"
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}