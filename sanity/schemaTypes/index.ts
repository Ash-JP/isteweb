import { type SchemaTypeDefinition } from 'sanity'
import event from './event'
import execom from './execom'
import gallery from './gallery'

import homepage from './homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, execom, gallery, event],
}