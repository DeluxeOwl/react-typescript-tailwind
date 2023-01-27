import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  age: number;
}

function UserList() {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => ky.get("/users/asd").json(),
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div className="text-red-500">An error occured</div>;
  }

  return (
    <>
      <button className="active:translate-y-1 transition-all inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-neutral-800 text-white hover:bg-neutral-700 shadow-md">
        Get some users!!
      </button>
      <ul className="list-disc space-y-4 ">
        {users?.map((p) => (
          <li
            key={p.id}
            className="bg-zinc-700 p-1 rounded-md"
          >{`${p.name}, ${p.age} years old`}</li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
