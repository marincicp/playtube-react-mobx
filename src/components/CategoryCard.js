import { observer } from "mobx-react-lite";
import { useStores } from "../context/RootStore.context";

function CategoryCard({ name, icon, category }) {
  const { store } = useStores();
  const active = name === store.category ? "bg-gray-light/70" : "";

  return (
    <div
      onClick={() => store.setCategory(name)}
      className={`w-[500px] md:w-full h-[80px] flex items-center justify-center sm:justify-start p-5 sm:pl-10 text-xl md:text-2xl text-custom-gray gap-6 cursor-pointer border-b-2 ${active} hover:bg-gray-light/70 group`}
    >
      <span className="text-black group-hover:scale-150 transition duration-500">
        {" "}
        {icon}
      </span>{" "}
      <p className="font-bold">{name}</p>
    </div>
  );
}

export default observer(CategoryCard);
