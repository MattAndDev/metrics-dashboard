declare namespace GridCssNamespace {
  export interface IGridCss {
    wrap: string
  }
}

declare const GridCssModule: GridCssNamespace.IGridCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GridCssNamespace.IGridCss
}

export = GridCssModule
