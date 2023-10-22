export type Population = {
  year: number
} & Record<string, number>

type PopulationResult = {
  boundaryYear: number
  data: { label: string; data: { year: number; value: number }[] }[]
}

export type Populations = {
  message: string | null
  result: PopulationResult
}
