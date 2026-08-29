import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({ name: 'dateTaken', type: 'date' }),
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'alt', order: 'order', media: 'image' },
    prepare({ title, order, media }) {
      return { title: title || 'Untitled', subtitle: order != null ? `#${order}` : '', media }
    },
  },
})
