'use client'
import { TAllocation } from '@/types/project'
import React from 'react'
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartAllocations({ data }: { data: TAllocation[] }) {
  const series: number[] = data.map(i => i.supply)
  const labels: string[] = data.map(i => i.name)
  const option: ApexCharts.ApexOptions = {
    chart: {
      id: 'chart-allocation',
      type: 'pie',
      width:'100%'
    },
    labels,
    legend: {
      position: 'bottom',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }
  return (
    <div className='md:w-1/2 mx-auto'>
      <ApexChart type="pie" options={option} series={series} />
    </div>
  )
}
