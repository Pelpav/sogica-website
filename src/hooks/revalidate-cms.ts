import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { revalidateCmsCache } from '@/lib/revalidate-cms'

export const revalidateCmsAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateCmsCache()
  return doc
}

export const revalidateCmsAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateCmsCache()
  return doc
}

export const revalidateCmsGlobalAfterChange: GlobalAfterChangeHook = ({ doc }) => {
  revalidateCmsCache()
  return doc
}
