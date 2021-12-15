const path = require('path')

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
    env: {
      REACT_APP_API_URL: process.env.REACT_APP_API_URL ,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ,
      GENERATE_SOURCEMAP: false,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
}
