import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recording',
  title: 'Recording',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'composer', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'dateRecorded', type: 'date' }),
    defineField({ name: 'duration', type: 'string' }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'album', type: 'string' }),
    defineField({ name: 'spotifyUrl', type: 'url' }),
    defineField({ name: 'appleMusicUrl', type: 'url' }),
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', composer: 'composer', order: 'order' },
    prepare({ title, composer, order }) {
      return { title, subtitle: [order != null ? `#${order}` : null, composer].filter(Boolean).join(' · ') }
    },
  },
})
