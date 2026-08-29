import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'About' }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'profileImageAlt',
      type: 'string',
      initialValue: 'The Muse Duo professional portrait',
    }),
    defineField({
      name: 'artists',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', validation: (r) => r.required() },
            { name: 'instrument', type: 'string', validation: (r) => r.required() },
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'About Section' }) },
})
