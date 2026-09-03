import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Contact' }),
    defineField({ name: 'subtitle', type: 'text', rows: 3 }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      description: 'Optional. Shown under the email as a secondary contact.',
    }),
    defineField({
      name: 'management',
      type: 'object',
      description: 'Optional. Shown as a "Management" block below the primary contact.',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
      ],
    }),
    defineField({
      name: 'social',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url' },
        { name: 'youtube', type: 'url' },
        { name: 'facebook', type: 'url' },
        { name: 'spotify', type: 'url' },
        { name: 'appleMusic', type: 'url' },
      ],
    }),
    defineField({
      name: 'contactImage',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact Section' }) },
})
