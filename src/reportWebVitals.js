/** web-vitals 是 Google 提供的一个 JavaScript 库，用于 测量网页性能，特别是核心 Web 指标（Core Web Vitals），如：
 * LCP（Largest Contentful Paint） - 最大内容绘制（加载速度）
 * FID（First Input Delay） - 首次输入延迟（交互响应）
 * CLS（Cumulative Layout Shift） - 累积布局偏移（视觉稳定性）
 * 这些指标可以帮助开发者优化用户体验，提升网站的 SEO 排名。
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals
