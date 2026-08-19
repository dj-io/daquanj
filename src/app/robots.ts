import type { MetadataRoute } from 'next'
import { blogOrigin } from '@/lib/blog'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${blogOrigin()}/sitemap.xml`,
	}
}
