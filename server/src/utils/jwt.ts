import * as jose from 'jose'
import fs from 'fs'

const privateKeyPath = './privateKey.json'
const publicKeyPath = './publicKey.json'

const privateKeyRefreshPath = './privateKeyRefresh.json'
const publicKeyRefreshPath = './publicKeyRefresh.json'

const rawPrivateKey = JSON.parse(fs.readFileSync(privateKeyPath, 'utf8'))
const rawPublicKey = JSON.parse(fs.readFileSync(publicKeyPath, 'utf8'))

const rawPrivateKeyRefresh = JSON.parse(
  fs.readFileSync(privateKeyRefreshPath, 'utf8'),
)
const rawPublicKeyRefresh = JSON.parse(
  fs.readFileSync(publicKeyRefreshPath, 'utf8'),
)

let privateKey: Uint8Array | jose.KeyLike
let publicKey: Uint8Array | jose.KeyLike

let privateKeyRefresh: Uint8Array | jose.KeyLike
let publicKeyRefresh: Uint8Array | jose.KeyLike
;(async () => {
  try {
    privateKey = await jose.importJWK(rawPrivateKey)
    publicKey = await jose.importJWK(rawPublicKey)

    privateKeyRefresh = await jose.importJWK(rawPrivateKeyRefresh)
    publicKeyRefresh = await jose.importJWK(rawPublicKeyRefresh)

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

export const signRefreshToken = (payload: jose.JWTPayload) =>
  new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'ES256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('24h')
    .sign(privateKeyRefresh)

export const verifyJwt = (jwt: string) =>
  jose.jwtVerify(jwt, publicKey, {
    issuer,
    audience,
  })

export const verifyRefreshToken = (jwt: string) =>
  jose.jwtVerify(jwt, publicKeyRefresh, { issuer, audience })
