import * as jose from 'jose'
import fs from 'fs'

const privateKeyPath = './privateKey.json'
const publicKeyPath = './publicKey.json'

const rawPrivateKey = JSON.parse(fs.readFileSync(privateKeyPath, 'utf8'))
const rawPublicKey = JSON.parse(fs.readFileSync(publicKeyPath, 'utf8'))

let privateKey: Uint8Array | jose.KeyLike
let publicKey: Uint8Array | jose.KeyLike
;(async () => {
  try {
    privateKey = await jose.importJWK(rawPrivateKey)
    publicKey = await jose.importJWK(rawPublicKey)
    console.log(`JWT keys ready`)
  } catch (err) {
    console.error(err)
    console.log(
      `There was an error with the public/private key pair to issue JWTs. Keys should be 'ES256', formatted as a JWKs and located in ${privateKeyPath} and ${publicKeyPath}.`,
    )
  }
})()

const issuer = 'attendo-api'
const audience = 'https://attendo.com'

export const signJwt = (payload: jose.JWTPayload) =>
  new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'ES256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('30m')
    .sign(privateKey)

export const verifyJwt = (jwt: string) =>
  jose.jwtVerify(jwt, publicKey, {
    issuer,
    audience,
  })
