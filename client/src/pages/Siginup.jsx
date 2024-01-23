export default function Siginup() {
  return (
    <div>
      <h3 className="text-center text-3xl capitalize font-semibold my-5">
        sign up
      </h3>
      <form className="flex flex-col gap-4 max-w-lg my-3 mx-auto">
        <input
          type="text"
          name="username"
          placeholder="username"
          className="bg-slate-200 rounded p-3 outline-slate-600 placeholder:text-slate-700 placeholder:capitalize"
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          className="bg-slate-200 rounded p-3 outline-slate-600 placeholder:text-slate-700 placeholder:capitalize"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-slate-200 rounded p-3 outline-slate-600 placeholder:text-slate-700 placeholder:capitalize"
        />
        <button
          type="submit"
          className="bg-slate-800 rounded-md p-2 text-slate-100 capitalize text-lg font-semibold"
        >
          join us
        </button>
      </form>
    </div>
  );
}
