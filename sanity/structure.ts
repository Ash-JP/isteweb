import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Our singleton type has a list item with a custom child
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(
          // Instead of rendering a list of documents, we render a single
          // document, specifying the `documentId` manually to ensure
          // that we're editing the very same document every time
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      // Regular document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['homepage'].includes(listItem.getId() || '')
      ),
    ])
