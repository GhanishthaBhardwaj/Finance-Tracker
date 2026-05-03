import { useState } from "react";

function Expenses({ expenses, updateExpenses }) {
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [payment, setPayment] = useState("Cash");
  const [notes, setNotes] = useState("");

  const [filterCategory, setFilterCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const today = new Date().toLocaleDateString();
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = y.toLocaleDateString();

  // 🔷 FILTER
  const filteredExpenses = expenses.filter((e) => {
    const categoryMatch =
      filterCategory === "All" || e.category === filterCategory;

    const dateMatch =
      dateFilter === "All" ||
      (dateFilter === "Today" && e.date === today) ||
      (dateFilter === "Yesterday" && e.date === yesterday);

    return categoryMatch && dateMatch;
  });

  // ➕ ADD
  const saveExpense = (e) => {
    e.preventDefault();
    if (!amount || !desc) return alert("Fill all fields");

    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      desc,
      category,
      date: date || today,
      payment,
      notes,
    };

    updateExpenses([...expenses, newExpense]);
    resetForm();
    setShowModal(false);
  };

  // ✏️ EDIT
  const updateEdit = (e) => {
    e.preventDefault();
    const updated = expenses.map((exp) =>
      exp.id === editingExpense.id ? editingExpense : exp
    );
    updateExpenses(updated);
    setEditingExpense(null);
  };

  // 🗑 DELETE
  const deleteExpense = (id) => {
    updateExpenses(expenses.filter((e) => e.id !== id));
  };

  const resetForm = () => {
    setAmount("");
    setDesc("");
    setCategory("Food");
    setDate("");
    setPayment("Cash");
    setNotes("");
  };

  return (
    <div className="px-10 py-12 space-y-10">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Expense Overview 💸
        </h2>
        <p className="text-gray-500 text-sm">
          Manage and track your spending efficiently
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">

        <div className="flex gap-2">
          {["All", "Today", "Yesterday"].map((item) => (
            <button
              key={item}
              onClick={() => setDateFilter(item)}
              className={`px-3 py-1 rounded-full text-sm ${
                dateFilter === item
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option>All</option>
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
          </select>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            + Add
          </button>
        </div>

      </div>

      {/* LIST */}
      {filteredExpenses.length === 0 ? (
        <p className="text-center text-gray-400">
          No expenses yet 🚀
        </p>
      ) : (
        filteredExpenses.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <p className="text-lg font-bold">₹{item.amount}</p>
              <p>{item.desc}</p>
              <p className="text-sm text-gray-500">
                {item.category} • {item.date}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <button
                onClick={() => setEditingExpense(item)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteExpense(item.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

        {/* 🔥 ADD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <form
            onSubmit={saveExpense}
            className="bg-white p-6 rounded-2xl w-96 shadow-xl space-y-3"
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3  text-inherit-50"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold">Add Expense</h2>

            <input type="number" placeholder="Amount"
              value={amount} onChange={(e)=>setAmount(e.target.value)}
              className="border p-2 w-full rounded-lg"/>

            <input type="text" placeholder="Description"
              value={desc} onChange={(e)=>setDesc(e.target.value)}
              className="border p-2 w-full rounded-lg"/>

            <select onChange={(e)=>setCategory(e.target.value)}
              className="border p-2 w-full rounded-lg">
              <option>Food</option>
              <option>Shopping</option>
              <option>Travel</option>
              <option>Movie</option>
              <option>Recharge</option>
              <option>EMI</option>
            </select>

            <input type="date"
              onChange={(e)=>setDate(e.target.value)}
              className="border p-2 w-full rounded-lg"/>

            <select onChange={(e)=>setPayment(e.target.value)}
              className="border p-2 w-full rounded-lg">
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
            </select>

            <textarea placeholder="Notes"
              onChange={(e)=>setNotes(e.target.value)}
              className="border p-2 w-full rounded-lg"/>

            <button className="bg-[#4F8CFF] text-white w-full py-2 rounded-lg">
              Save Expense
            </button>
          </form>
        </div>
      )}
      {/* EDIT MODAL */}
      {editingExpense && (
        <div
          className="fixed inset-0 bg-black/30 flex justify-center items-center"
          onClick={() => setEditingExpense(null)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={updateEdit}
            className="bg-white p-5 rounded shadow w-80 relative"
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setEditingExpense(null)}
              className="absolute top-2 right-3"
            >
              ✕
            </button>

            <h3>Edit Expense</h3>

            <input
              value={editingExpense.amount}
              onChange={(e) =>
                setEditingExpense({
                  ...editingExpense,
                  amount: Number(e.target.value),
                })
              }
              className="border w-full mb-2 p-1"
            />

            <input
              value={editingExpense.desc}
              onChange={(e) =>
                setEditingExpense({
                  ...editingExpense,
                  desc: e.target.value,
                })
              }
              className="border w-full mb-2 p-1"
            />

            <button className="bg-blue-500 text-white w-full p-1">
              Update
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

export default Expenses;