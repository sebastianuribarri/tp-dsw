import { useForm } from "react-hook-form";
import { User, registerUser } from "../../api/auth";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <form
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
          const user: User = {
            username: values.username,
            email: values.email,
            password: values.password,
          };

          const res = await registerUser(user);

          console.log(res);
        })}
      >
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
        />

        <input type="email" {...register("email", { required: true })} />

        <input type="password" {...register("password", { required: true })} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
