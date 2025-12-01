import { Input } from "rsuite";
import { IoSearchOutline } from "react-icons/io5";

const TableSearch = ({ search, setSearch }) => {
  return (
    <div className="flex xsm:mt-0 mt-2 xsm:ml-5 ml-0 sm:min-w-[320px]">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search.."
          value={search}
          onChange={(val) => setSearch(val)}
          className="rounded border py-2 px-5 pl-7 text-black outline-none dark:text-white"
        />
        <IoSearchOutline className="absolute top-[30%] left-2" />
      </div>
    </div>
  );
};

export default TableSearch;
