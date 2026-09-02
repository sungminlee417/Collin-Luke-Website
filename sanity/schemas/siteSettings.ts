import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'site', title: 'Site' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'site', initialValue: 'The Muse Duo' }),
    defineField({ name: 'description', type: 'text', group: 'site' }),
    defineField({ name: 'url', type: 'url', group: 'site' }),
    defineField({ name: 'seoImage', type: 'image', group: 'site' }),
    defineField({ name: 'favicon', type: 'image', group: 'site' }),

    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', validation: (r) => r.required() },
            { name: 'section', type: 'string', validation: (r) => r.required() },
            { name: 'order', type: 'number', initialValue: 0 },
          ],
          preview: {
            select: { title: 'label', subtitle: 'section' },
          },
        },
      ],
    }),
    defineField({
      name: 'showLogo',
      type: 'boolean',
      group: 'navigation',
      initialValue: false,
    }),

    defineField({
      name: 'footerTitle',
      title: 'Footer Title',
      type: 'string',
      group: 'footer',
      initialValue: 'The Muse Duo',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerSocialLinks',
      title: 'Footer Social Links',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', validation: (r) => r.required() },
            { name: 'href', type: 'url', validation: (r) => r.required() },
            { name: 'order', type: 'number', initialValue: 0 },
          ],
          preview: { select: { title: 'name', subtitle: 'href' } },
        },
      ],
    }),

  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
