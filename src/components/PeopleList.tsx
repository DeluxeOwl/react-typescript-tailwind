import ky from "ky";
import { useState } from "react";

interface People {
  id: string;
  name: string;
  age: number;
}

function PeopleList() {
  const [people, setPeople] = useState<People[]>([]);

  const handleGetPeople = async () => {
    const json = await ky.get("/people").json();
    setPeople(json as People[]);
  };

  return (
    <>
      <button
        onClick={handleGetPeople}
        className="active:translate-y-1 transition-all inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-neutral-800 text-white hover:bg-neutral-700 shadow-md"
      >
        Get some people!!
      </button>
      <ul className="list-disc space-y-4 ">
        {people.map((p) => (
          <li
            key={p.id}
            className="bg-zinc-700 p-1 rounded-md"
          >{`${p.name}, ${p.age} years old`}</li>
        ))}
      </ul>
    </>
  );
}

export default PeopleList;
