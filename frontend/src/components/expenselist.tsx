import {useEffect} from 'react'
import { useExpenseStore } from './store/expensestor'
import Addexpense from './addexpense';
function expenselist() {

    const {expense,
    setSearch,
    getExpense,
    loadExpense,
    deleteExpense,
    fetchExpense, } = useExpenseStore();
    useEffect(() => {
    fetchExpense();
  }, []);
  return (
     <>
      <div className="flex gap-2">
        <input
          type="text"
          className="p-2 border rounded-md w-64"
          placeholder="Search Patient"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-sky-400 hover:bg-sky-600 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={getExpense}
        >
          Search
        </button>
        <Addexpense/>
      </div>
      <h1>Expense List</h1>
      <div className="flex justify-center px-4">
        <div className="w-full max-w-6xl overflow-x-auto">
          <h2 className="mb-4 font-bold text-xl">Appointment List</h2>

          <table className="w-full border-collapse shadow-lg bg-white overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-4">Name</th>
                <th className="border p-4">Amount</th>
                <th className="border p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {expense.map((e: any) => (
                <tr key={e._id} className="hover:bg-gray-50">
                  <td className="border p-4">{e.name}</td>
                  <td className="border p-4">{e.amount}</td>

                  <td className="border p-4">
                    <div className="flex gap-3 ">
                      <button
                        onClick={() => loadExpense(e)}
                        className="cursor-pointer bg-blue-500"
                      ></button>

                      <button
                        onClick={() => deleteExpense(e._id)}
                        className="cursor-pointer bg-red-500"
                      ></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default expenselist