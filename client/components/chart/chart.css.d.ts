declare namespace ChartCssNamespace {
  export interface IChartCss {
    circle: string
    info: string
    infoText: string
    lineMetric: string
    lineMetricOpaque: string
    loading: string
    loadingText: string
    rect: string
    rectBg: string
  }
}

declare const ChartCssModule: ChartCssNamespace.IChartCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ChartCssNamespace.IChartCss
}

export = ChartCssModule
