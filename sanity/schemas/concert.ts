import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'concert',
  title: 'Concert',
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
      name: 'date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timezone',
      type: 'string',
      options: {
        list: [
          'America/New_York',
          'America/Chicago',
          'America/Denver',
          'America/Los_Angeles',
          'America/Phoenix',
          'UTC',
        ],
      },
      initialValue: 'America/New_York',
    }),
    defineField({ name: 'venue', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'location', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'ticketUrl', type: 'url' }),
    defineField({ name: 'moreInfoUrl', type: 'url' }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['upcoming', 'past'] },
      initialValue: 'upcoming',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 4 }),
  ],
  orderings: [
    { title: 'Date, Newest', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
    { title: 'Date, Oldest', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', venue: 'venue', date: 'date', status: 'status' },
    prepare({ title, venue, date, status }) {
      const d = date ? new Date(date).toLocaleDateString() : ''
      return { title, subtitle: `${status} · ${d} · ${venue}` }
    },
  },
})
