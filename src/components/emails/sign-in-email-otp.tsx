import { Html, Button } from "@react-email/components"

type EmailProps = {
  otp: string
}

export default function Email({ otp = "999999" }: EmailProps) {
  return (
    <Html lang="en">
      <Button>{otp}</Button>
    </Html>
  )
}

export { Email }
