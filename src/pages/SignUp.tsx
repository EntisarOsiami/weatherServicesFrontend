import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router"
import { Link } from "react-router"
import { useState } from "react"
import { signUp, setToken } from "../services/auth"
import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type SignUpInputs = {
  email: string
  password: string
}

export default function SignUp() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>()
  
  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    setIsLoading(true)
    try {
      const response = await signUp(data)
      setToken(response.token)
      
      await Swal.fire({
        title: 'Success!',
        text: 'Account created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      
      navigate('/') 
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: error instanceof Error ? error.message : 'Failed to create account',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-center">
              Sign up 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">{errors.password.message}</span>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
            <p className="m-3 p-1">If you already have an account <Link to='/signIn' className="text-amber-800">sign in</Link></p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}