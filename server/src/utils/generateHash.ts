import { createHmac } from 'crypto'
import fs from 'fs'

const rawHmacKey = JSON.parse(fs.readFileSync('./hmacKey.json', 'utf8'))

export const generateHash = ({
  sessionId,
  code,
}: {
  sessionId: string
  code: string
}) => {
  // todo: is the hmac really necessary?
  // todo: use webcrypto.subtle to import key instead of rawHmacKey.k
  const hash = createHmac('sha256', rawHmacKey.k)
  hash.update(`${sessionId}${code}`)
  return hash.digest('base64')
}
