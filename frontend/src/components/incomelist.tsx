import { useEffect } from "react";
import { useIncomeStore } from "./store/incomestore";
import Addincome from "./addincome";

function IncomeList() {
  const {
    income,
    setSearch,
    getIncome,
    loadIncome,
    deleteIncome,
    fetchIncome,
  } = useIncomeStore();

  useEffect(() => {
    fetchIncome();
  }, [fetchIncome]);

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          className="p-2 border rounded-md w-64"
          placeholder="Search Income"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-sky-400 hover:bg-sky-600 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={getIncome}
        >
          Search
        </button>
        <Addincome />
      </div>

      <h1>Income List</h1>

      <table className="w-full border-collapse shadow-lg bg-white overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-4">Name</th>
            <th className="border p-4">Amount</th>
            <th className="border p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {income.map((e) => (
            <tr key={e._id} className="hover:bg-gray-50">
              <td className="border p-4">{e.name}</td>
              <td className="border p-4">{e.amount}</td>
              <td className="border p-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => loadIncome(e)}
                    className="cursor-pointer bg-blue-500 px-3 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteIncome(e._id)}
                    className="cursor-pointer bg-red-500 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default IncomeList;
