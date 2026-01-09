export interface HanyuItem {
  id?: string
  hanzi: string
  pinyin: string
  xinbanya: string
  tone?: string | null
  img?: string | null
  source?: string | null
  createdAt?: Date
  updatedAt?: Date
}
