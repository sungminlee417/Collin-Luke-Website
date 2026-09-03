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
    defineField({
      name: 'ctaText',
      type: 'string',
      description: 'Label under the scroll cue at the bottom of the hero (e.g. "Continue", "Explore")',
      initialValue: 'Continue',
    }),
    defineField({
      name: 'showCta',
      type: 'boolean',
      description: 'Toggle the scroll cue on/off.',
      initialValue: true,
    }),
  ],
  preview: { prepare: () => ({ title: 'Hero Section' }) },
})
