import { useGoalStore } from "./store/goalstore";

function AddGoal() {
  const {
    isModalOpen,
    setIsModalOpen,
    isEditing,
    updateGoal,
    createGoal,
    name,
    amount,
    setName,
    setAmount,
    cancelEdit,
  } = useGoalStore();

  return (
    <>
      <div className="flex justify-center">
        <button
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Goal
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-amber-100 w-full max-w-lg p-6 rounded-2xl shadow-2xl">
            <h1 className="font-bold text-xl mb-4 text-center">
              {isEditing ? "Update Appointment" : "Add Appointment"}
            </h1>

            <form
              onSubmit={isEditing ? updateGoal : createGoal}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1">Name</label>
                <input
                  className="w-full border p-2 rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1">Amount</label>
                <input
                  className="w-full border p-2 rounded-md"
                  value={amount}
                  onChange={(e) => setAmount(e.target.valueAsNumber)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 cursor-pointer"
              >
                {isEditing ? "Update Appointment" : "Add Appointment"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddGoal;