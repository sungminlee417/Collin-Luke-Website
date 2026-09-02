import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  description:
    'Time-bound calls to action (fundraisers, album releases, tour promos, etc.) rendered as CTA cards on the site.',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "Support Our 2026 Season"',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLabel',
      type: 'string',
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'placement',
      type: 'string',
      description: 'Where on the site the card should appear.',
      options: {
        list: [
          { title: 'Under Concerts', value: 'concerts' },
          { title: 'Under Recordings', value: 'recordings' },
          { title: 'Under Gallery', value: 'gallery' },
          { title: 'Under Press', value: 'press' },
        ],
      },
      initialValue: 'concerts',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide the card without deleting the campaign.',
    }),
    defineField({
      name: 'order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first when multiple campaigns share a placement.',
    }),
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', placement: 'placement', active: 'active' },
    prepare({ title, placement, active }) {
      return {
        title,
        subtitle: `${active ? '● active' : '○ hidden'} · under ${placement}`,
      }
    },
  },
})
