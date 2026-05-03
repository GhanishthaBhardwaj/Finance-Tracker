import { useState, useEffect, useRef } from "react";
import Expenses from "./Expenses";
import Analytics from "./Analytics";
import Goals from "./Goals";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState("");
  const [active, setActive] = useState("home");

  const homeRef = useRef(null);
  const expenseRef = useRef(null);
  const analyticsRef = useRef(null);
  const goalsRef = useRef(null);

  // 🔷 LOAD DATA
  useEffect(() => {
    const savedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];
    const savedBudget =
      localStorage.getItem("budget") || "";

    setExpenses(savedExpenses);
    setBudget(savedBudget);
  }, []);

  // 🔷 UPDATE EXPENSES
  const updateExpenses = (dataOrFn) => {
    setExpenses((prev) => {
      const updated =
        typeof dataOrFn === "function"
          ? dataOrFn(prev)
          : dataOrFn;

      localStorage.setItem("expenses", JSON.stringify(updated));
      return updated;
    });
  };

  // 🔷 SAVE BUDGET
  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const total = expenses.reduce(
    (sum, e) => sum + (Number(e.amount) || 0),
    0
  );

  const remaining = budget ? budget - total : 0;

  const scrollTo = (ref, section) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setActive(section);
  };

  return (
    <div className="relative min-h-screen bg-[#F5F8FF]">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(79,140,255,0.08),transparent_60%)] pointer-events-none"></div>

      {/* 🔵 NAVBAR */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 flex justify-between items-center px-10 py-4">

        <h1 className="text-2xl font-semibold text-[#4F8CFF] tracking-tight">
          💰 BudgetIQ
        </h1>

        <div className="flex gap-8 text-sm font-medium">
          {[
            { name: "home", label: "Home", ref: homeRef },
            { name: "expenses", label: "Expenses", ref: expenseRef },
            { name: "analytics", label: "Analytics", ref: analyticsRef },
            { name: "goals", label: "Goals", ref: goalsRef },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.ref, item.name)}
              className={`transition-all duration-200 ${
                active === item.name
                  ? "text-[#4F8CFF] border-b-2 border-[#4F8CFF] pb-1"
                  : "text-gray-500 hover:text-[#4F8CFF]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔷 CONTENT */}
      <div className="relative px-10 py-12 space-y-24">

        {/* 🏠 HOME */}
        <section ref={homeRef} className="space-y-8">

          {/* HEADER */}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-800">
              Welcome back 👋
            </h2>
            <p className="text-gray-500 mt-2">
              Track your spending, control your budget, and stay on top of your finances.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-3 gap-8">

            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <p className="text-gray-500 text-sm">Total Spent</p>
              <h2 className="text-3xl font-semibold text-[#4F8CFF] mt-2">
                ₹{total}
              </h2>
            </div>

            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <p className="text-gray-500 text-sm">Budget</p>
              <h2 className="text-3xl font-semibold mt-2">
                ₹{budget || 0}
              </h2>
            </div>

            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <p className="text-gray-500 text-sm">Remaining</p>
              <h2 className="text-3xl font-semibold text-green-600 mt-2">
                ₹{remaining}
              </h2>
            </div>

          </div>

          {/* PROGRESS */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-700 font-medium">
                📊 Budget Usage
              </p>
              <span className="text-sm text-gray-500">
                {budget
                  ? `${Math.round((total / budget) * 100)}% used`
                  : "No budget set"}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#4F8CFF] to-[#6EA8FE] h-3 rounded-full transition-all"
                style={{
                  width: budget
                    ? `${Math.min((total / budget) * 100, 100)}%`
                    : "0%"
                }}
              ></div>
            </div>
          </div>

          {/* INSIGHT */}
          <div className="bg-[#EAF2FF] p-6 rounded-2xl border border-blue-100 shadow-sm">
            <h3 className="font-medium text-[#4F8CFF] mb-1">
              💡 Insight
            </h3>

            <p className="text-sm text-gray-600">
              {expenses.length === 0
                ? "Start adding expenses to unlock insights."
                : `You’ve added ${expenses.length} expenses. Keep tracking to improve spending habits.`}
            </p>
          </div>

        </section>

        {/* 💸 EXPENSES */}
        <section ref={expenseRef}>
          <Expenses
            expenses={expenses}
            updateExpenses={updateExpenses}
          />
        </section>

        {/* 📊 ANALYTICS */}
        <section ref={analyticsRef}>
          <Analytics expenses={expenses} />
        </section>

        {/* 🎯 GOALS */}
        <section ref={goalsRef}>
          <Goals
            budget={budget}
            setBudget={setBudget}
          />
        </section>

      </div>
    </div>
  );
}

export default Dashboard;