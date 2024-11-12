/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true,  // GitHub Pages 不支持 Next.js 的图片优化
    domains: ['fonts.googleapis.com', 'fonts.gstatic.com'],  // 添加 Google Fonts 到安全域名列表
  },
  basePath: '/jiaqihe.github.io',
  assetPrefix: '/jiaqihe.github.io',
};

module.exports = nextConfig; 