declare namespace HeadingCssNamespace {
  export interface IHeadingCss {
    wrap: string
  }
}

declare const HeadingCssModule: HeadingCssNamespace.IHeadingCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HeadingCssNamespace.IHeadingCss
}

export = HeadingCssModule
