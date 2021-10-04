declare namespace FieldsetCssNamespace {
  export interface IFieldsetCss {
    legend: string
    wrap: string
  }
}

declare const FieldsetCssModule: FieldsetCssNamespace.IFieldsetCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FieldsetCssNamespace.IFieldsetCss
}

export = FieldsetCssModule
