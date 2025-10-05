import { Html, Button } from "@react-email/components"

type EmailProps = {
  otp: string
}

export function Email({ otp }: EmailProps) {
  return (
    <Html lang="en">
      <Button>{otp}</Button>
    </Html>
  )
}
