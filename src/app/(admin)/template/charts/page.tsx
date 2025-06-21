import React from 'react'
import SampleLineChart from './sample-line-chart'
import SampleBarChart from './sample-bar-chart'
import SampleAreaChart from './sample-area-chart'
import SampleDoughnutChart from './sample-doughnut-chart'
import SamplePolarAreaChart from './sample-polar-area-chart'
import SamplePieChart from './sample-pie-chart'
import dynamic from 'next/dynamic';

const SampleLineChartZoomable = dynamic(() => import('./sample-line-chart-zoomable'), {
  ssr: false,
});
import SampleBarChartWithNegative from './sample-bar-chart-with-negative'
import PageContainer from '@/components/page-container'

export default function ChartTemplatePage() {
  return (
    <PageContainer title='Chart' subtitle='Template Chart'>
      <div className='grid gap-3 md:grid-cols-2'>
        <div className='md:col-span-2'>
          <SampleBarChartWithNegative />
        </div>
        <div className='md:col-span-2'>
          <SampleLineChartZoomable />
        </div>
        <SampleLineChart />
        <SampleBarChart />
        <SampleAreaChart />
        <SampleDoughnutChart />
        <SamplePolarAreaChart />
        <SamplePieChart />
      </div>
    </PageContainer>
  )
}
