import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router"


  const signUpSchema = z.object({
  full_name: z.string().min(3,"Tên bắt buộc phải có"),
  email: z.email().min(3,"Email không hợp lệ"),
  password_hash: z.string().min(8,"Mật khẩu ít nhất phải có 8 ký tự") .regex(/[A-Za-z]/, "Mật khẩu phải có ít nhất một chữ cái") .regex(/\d/, "Mật khẩu phải có ít nhất một chữ số"),
  })

  type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignupForm({className,...props}: React.ComponentProps<"div">) {
  
  const signUp = useAuthStore((state) => state.signUp);
  const navigate = useNavigate();

  const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async(data: SignUpFormValues) =>{
    const {full_name, email, password_hash} = data;

    // goi backend api de dang ky
    await signUp(full_name, email, password_hash);
    navigate("/signin");
  }



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
           <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center gap-2">
              <a href="/" className="mx-auto block w-fit text-center">
                <img src="/favicon.svg" alt="logo" />
              </a>
              <h1 className="text-2xl font-bold">Tạo tài khoản</h1>
              <p className="text-muted-foreground text-balance">
                Chào mừng bạn! Hãy đăng ký để bắt đầu!
              </p>
            </div>

            {/* full name input */}
            <div className="space-y-2">
                <Label htmlFor="full_name" className="block text-sm">
                  Họ tên đầy đủ
                </Label>
                <Input className="" type="text" id="full_name" placeholder="Nguyễn Văn A" {...register("full_name")}/>
                {errors.full_name && (
                  <p className="text-destructive text-sm">{errors.full_name.message}</p>
                )}
            </div>

            {/* email name input */}
            <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <Input type="email" id="email" placeholder="m@example.com" {...register("email")}/>
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email.message}</p>
                )}
            </div>


            <div className="space-y-2">
                <Label htmlFor="password_hash" className="block text-sm">
                  Mật khẩu
                </Label>
                <Input type="password_hash" id="password_hash" {...register("password_hash")}/>
                {errors.password_hash && (
                  <p className="text-destructive text-sm">{errors.password_hash.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Tạo tài khoản
            </Button>

            <div className="text-center text-sm">
              Đã có tài khoản? {""}
              <a href="/signin" className="underline underline-offset-4">Đăng nhập</a>
            </div>

           </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-4">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">điều khoản dịch vụ</a>{" "}
        và <a href="#">chính xác bảo mật</a> của chúng tôi.
      </div>
    </div>
  )
}
