import type { StructureResolver } from 'sanity/structure'

const SINGLETONS = [
  { id: 'hero', type: 'hero', title: 'Hero Section' },
  { id: 'about', type: 'about', title: 'About Section' },
  { id: 'contact', type: 'contact', title: 'Contact Section' },
  { id: 'siteSettings', type: 'siteSettings', title: 'Site Settings' },
] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({ id, type, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id).title(title))
      ),
      S.divider(),
      S.documentTypeListItem('concert').title('Concerts'),
      S.documentTypeListItem('recording').title('Recordings'),
      S.documentTypeListItem('galleryImage').title('Gallery Images'),
      S.documentTypeListItem('pressArticle').title('Press Articles'),
      S.documentTypeListItem('campaign').title('Campaigns'),
    ])

export const singletonTypes = new Set<string>(SINGLETONS.map((s) => s.type))
export const singletonActions = new Set<string>(['publish', 'discardChanges', 'restore'])
