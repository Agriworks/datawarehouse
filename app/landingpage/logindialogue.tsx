import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react' // Add useSession

export function LoginDialog() {
  const router = useRouter()
  const { data: session } = useSession() // Add this hook

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google')

      if (result?.ok) {
        // Make request to check role
        const response = await fetch('/api/roles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session?.user?.email,
          }),
        })

        const data = await response.json()
        console.log('User role:', data.role)

        // Redirect after role check
        router.push('/datastore/browse')
      } else {
        console.error('Sign in failed:', result?.error)
      }
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">Login Page</DialogTitle>
          <DialogDescription className="text-center">
            Enter your details below to login to your account.
          </DialogDescription>
          <Button
            onClick={handleGoogleSignIn}
            className="w-full"
            variant="outline"
          >
            Sign in with Google
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
