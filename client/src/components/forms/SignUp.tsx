interface SignUpProps {
  selectedIdx: number
  idx: number
}

export const SignUp = (props: SignUpProps) => {
  const { selectedIdx, idx } = props
  return (
    <form hidden={selectedIdx !== idx}>
      <label htmlFor="signup-display-name">Display name</label>
      <input type="text" id="signup-display-name" />
      <label htmlFor="signup-email">Email</label>
      <input type="email" id="signup-email" />
      <label htmlFor="signup-password">Password</label>
      <input type="password" id="signup-password" />
      <label htmlFor="signup-confirm-password">Confirm password</label>
      <input type="password" id="signup-confirm-password" />
      <button type="submit">Sign up</button>
    </form>
  )
}
