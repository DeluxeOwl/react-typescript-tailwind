import ky from "ky";

function App() {
  return (
    <div>
      Hello, world!
      <div>
        <button
          onClick={async () => {
            const json = await ky.get("/people").json();
            console.log(json);
          }}
          className="active:translate-y-[1px] transition-all shadow-md ml-2 w-fit px-4 py-2 h-fit bg-black text-white rounded-md"
        >
          Get some people!!
        </button>
      </div>
    </div>
  );
}

export default App;
