import Input from "./Input";
import Button from "./Button";

export default function UserPassFields({
  form,
  onChange,
  onSubmit,
  buttonText = "Submit",
  children,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-full max-w-xs mt-2"
    >
      <Input
        name="username"
        value={form.username}
        onChange={onChange}
        placeholder="Username"
        required
        className="mb-0.5 px-3 py-2 rounded-t-lg rounded-b-none"
      />
      <Input
        type="password"
        name="password"
        value={form.password}
        onChange={onChange}
        placeholder="Password"
        required
        className="mb-8 px-3 py-2 rounded-t-none rounded-b-lg"
      />
      <div className="flex space-x-3">
        <Button type="submit">{buttonText}</Button>
        {children}
      </div>
    </form>
  );
}
