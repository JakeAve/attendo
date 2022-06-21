import * as jose from 'jose'
import fs from 'fs'

const rawPrivateKey = JSON.parse(fs.readFileSync('./privateKey.json', 'utf8'))
const rawPublicKey = JSON.parse(fs.readFileSync('./publicKey.json', 'utf8'))

let privateKey: Uint8Array | jose.KeyLike
let publicKey: Uint8Array | jose.KeyLike
;(async () => {
  privateKey = await jose.importJWK(rawPrivateKey)
  publicKey = await jose.importJWK(rawPublicKey)
})()

const issuer = 'attendo-api'
const audience = 'https://attendo.com'

export const signJwt = (payload: jose.JWTPayload) =>
  new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'ES256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('2h')
    .sign(privateKey)

export const verifyJwt = (jwt: string) =>
  jose.jwtVerify(jwt, publicKey, {
    issuer,
    audience,
  })
