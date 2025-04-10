"use client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface IUser {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (payload: IUser) => {
      console.log("🔥 Đang gọi API với:", payload);
      await fetch("http://localhost:8080/user/create", {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          username: payload.username,
          password: payload.password,
        }),
        headers: {
          "Content-Type": " application/json",
        },
      });
    },
  });

  const onSubmit = (data: IUser) => {
    console.log("Form submitted with:", data);
    // Ở đây bạn có thể gọi API để gửi dữ liệu đăng ký
    mutation.mutate({
      email: data?.email,
      username: data?.username,
      password: data?.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Nhập username"
              {...register("username", { required: "Username là bắt buộc" })}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )} */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Nhập email"
              {...register("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email không hợp lệ",
                },
              })}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )} */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              {...register("password", { required: "Mật khẩu là bắt buộc" })}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )} */}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl"
          >
            Đăng ký
          </button>
        </form>

        <div className="mt-6">
          <a
            href="http://localhost:8088/rest/api/oauth2/authorization/google"
            className="w-full inline-block text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl"
          >
            Đăng ký bằng Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
