import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      options: { hotspot: false },
    }),
    defineField({ name: 'logoAlt', type: 'string', initialValue: 'The Muse Duo Logo' }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'backgroundAlt', type: 'string', initialValue: 'The Muse Duo Background' }),
    defineField({ name: 'ctaText', type: 'string', initialValue: 'Explore' }),
    defineField({ name: 'showCta', type: 'boolean', initialValue: true }),
    defineField({ name: 'logoWidth', type: 'number', initialValue: 400 }),
    defineField({ name: 'logoHeight', type: 'number', initialValue: 200 }),
    defineField({
      name: 'contentAlignment',
      type: 'string',
      options: { list: ['left', 'center'] },
      initialValue: 'left',
    }),
    defineField({
      name: 'overlayOpacity',
      type: 'string',
      options: { list: ['light', 'medium', 'dark'] },
      initialValue: 'medium',
    }),
  ],
  preview: { prepare: () => ({ title: 'Hero Section' }) },
})
