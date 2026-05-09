import Login from "./components/login";
import ExpenseList from "./components/expenselist";
import IncomeList from "./components/incomelist";
import GoalList from "./components/goallist";

import "./App.css";

function App() {
  return (
    <>
      <Login />

      <IncomeList />

      <ExpenseList />

      <GoalList />
    </>
  );
}

export default App;
