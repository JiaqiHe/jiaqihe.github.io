/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true  // GitHub Pages 不支持 Next.js 的图片优化
  },
  // 只在生产环境使用 basePath
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/jiaqihe.github.io'
  } : {})
};

module.exports = nextConfig; 