import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recording',
  title: 'Recording',
  type: 'document',
  description: 'Individual live/studio recording shown in the Music section track list.',
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
    defineField({
      name: 'composer',
      type: 'string',
      description: 'Optional. Shown under the title in the track list.',
    }),
    defineField({
      name: 'duration',
      type: 'string',
      description: 'Optional. e.g. "4:31". Shown on the right of the track row.',
    }),
    defineField({
      name: 'order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first.',
    }),
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
