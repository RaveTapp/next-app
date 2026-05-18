"use client";

import { signInUser } from "@/app/actions/authActions";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import {
  Button,
  Card,
  FieldError,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiEnvelope } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === "success") {
      router.push("/members");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Card className="w-2/5 mx-auto">
      <Card.Header className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-surface-foreground">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500">Welcome back</p>
        </div>
      </Card.Header>
      <Card.Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center space-y-4 w-full mt-2">
            <TextField
              isRequired
              className="w-full max-w-70"
              name="email"
              isInvalid={!!errors.email}
            >
              <Label>Email address</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <BiEnvelope className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  {...register("email")}
                  className="w-full max-w-70"
                  placeholder="name@gmail.com"
                />
              </InputGroup>
              <FieldError>{errors.email?.message as string}</FieldError>
            </TextField>
            <TextField
              isRequired
              className="w-full max-w-70"
              name="password"
              isInvalid={!!errors.password}
            >
              <Label>Password</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <CgPassword className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  className="w-full max-w-70"
                  type={isVisible ? "text" : "password"}
                  placeholder="password"
                  {...register("password")}
                />
                <InputGroup.Suffix className="pr-0">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeOff className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError>{errors.password?.message as string}</FieldError>
            </TextField>
            <Button
              isPending={isSubmitting}
              isDisabled={!isValid}
              className="w-full max-w-70"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
}
