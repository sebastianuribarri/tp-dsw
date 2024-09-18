import { useForm } from "react-hook-form";
import { registerUser } from "../../api/user";
import { User } from "../../types/User";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <form
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
          const user: User = {
            username: values.username,
            mail: values.email,
            password: values.password,
            id: values.id,
            premium: values.premium,
            teams: values.teams,
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
