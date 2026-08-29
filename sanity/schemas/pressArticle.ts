import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pressArticle',
  title: 'Press Article',
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
    defineField({ name: 'author', type: 'string' }),
    defineField({
      name: 'date',
      title: 'Publication Date',
      type: 'string',
      description: 'Free-form date string (e.g. "May 2, 2025")',
    }),
    defineField({
      name: 'link',
      title: 'Article URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', author: 'author', media: 'image' },
    prepare({ title, author, media }) {
      return { title, subtitle: author, media }
    },
  },
})
