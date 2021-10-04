declare namespace TagCssNamespace {
  export interface ITagCss {
    fail: string
    plain: string
    success: string
    warn: string
    wrap: string
  }
}

declare const TagCssModule: TagCssNamespace.ITagCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TagCssNamespace.ITagCss
}

export = TagCssModule
