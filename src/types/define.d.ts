export interface HanyuItem {
  id?: string
  hanzi: string
  pinyin: string
  xinbanya: string
  riyu?: string | null // 日语 - 日本語
  tone?: string | null
  img?: string | null
  source?: string | null
  createdAt?: Date
  updatedAt?: Date
}

// model Hanyu {
//   id        String @id @unique
//   hanzi     String
//   pinyin    String
//   xinbanya  String
//   tone      String ?
//     img       String ?
//       source    String ? @default ("form-hanyu")
//   createdAt DateTime @default (now())
//   updatedAt DateTime
// }