import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router"


const signInSchema = z.object({
  email: z.email().min(3,"Email không hợp lệ"),
  password_hash: z.string().min(8,"Mật khẩu ít nhất phải có 8 ký tự").regex(/\d/, "Mật khẩu phải có ít nhất một chữ số"),
})

type SignInFormValues = z.infer<typeof signInSchema>;


export function SigninForm({className,...props}: React.ComponentProps<"div">) {
    const {signIn} = useAuthStore();
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema)
      });
      
    const onSubmit = async(data: SignInFormValues) =>{
      const {email, password_hash} = data;
      // gọi api để đăng nhập
      const ok = await signIn(email, password_hash);
      console.log("sign in result", ok);
      console.log(useAuthStore.getState());
      if (ok) {
        navigate("/");
      }
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
              <h1 className="text-2xl font-bold">Chào mừng quay lại</h1>
              <p className="text-muted-foreground text-balance">
                Đăng nhập vào tài khoản của bạn 
              </p>
            </div>

            {/* email input */}
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
              Đăng nhập
            </Button>

            <div className="text-center text-sm">
              Chưa có tài khoản? {""}
              <a href="/signup" className="underline underline-offset-4">Đăng ký</a>
            </div>

           </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.png"
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


