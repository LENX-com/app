import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//wabei.co.uk/api')

  return getServerSideSitemap(ctx, [
    {
      loc: 'https://wabei.co.uk',
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://wabei.co.uk/dynamic-path-2',
      lastmod: new Date().toISOString(),
      // changefreq  
      // priority
    },
  ])
}

// Default export to prevent next.js errors
export default () => {}