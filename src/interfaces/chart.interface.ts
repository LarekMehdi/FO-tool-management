
export interface ChartDataset {
  label: string
  data: number[]
  borderColor?: string
  backgroundColor?: string
  fill?: boolean
  tension?: number
}


export interface LineChartData {
  labels: string[]          // axe X 
  datasets: ChartDataset[]
}