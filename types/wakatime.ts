interface WakatimeData {
  name: string
  percent: number
}

export interface Stats {
  coding: {
    data: {
      grand_total: {
        total_seconds_including_other_language: number
      }
      range: {
        start: string
      }
    }
  }
  editors: {
    data: WakatimeData[]
  }
  os: {
    data: WakatimeData[]
  }
  languages: {
    data: WakatimeData[]
  }
}
