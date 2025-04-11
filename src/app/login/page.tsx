"use client";
import IUser from "@/constants/type";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
  usernameOrEmail: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const mutation = useMutation({
    mutationFn: async (payload: IUser) => {
      await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
          username: payload.username,
          password: payload.password,
        }),
        headers: {
          "Content-Type": " application/json",
        },
      });
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form submitted:", data);
    mutation.mutate({
      username: data?.usernameOrEmail,
      password: data?.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username / Email
            </label>
            <input
              type="text"
              placeholder="Nhập email hoặc username"
              {...register("usernameOrEmail", {
                required: "Trường này là bắt buộc",
              })}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.usernameOrEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.usernameOrEmail.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              {...register("password", { required: "Vui lòng nhập mật khẩu" })}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-6">
          <Link
            href="/login/register"
            className="text-blue-500 hover:underline"
          >
            Bạn chưa có tài khoản?
          </Link>
        </div>

        <div className="mt-6">
          <a
            href="http://localhost:8088/rest/api/oauth2/authorization/google"
            className="w-full inline-block text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl"
          >
            Đăng nhập bằng Google
          </a>
        </div>
      </div>
    </div>
  );
}
