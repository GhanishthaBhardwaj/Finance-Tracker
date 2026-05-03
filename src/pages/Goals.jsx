function Goals({ budget, setBudget }) {
  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">

      <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl border border-gray-100 shadow-sm w-full max-w-lg space-y-6">

        {/* 🔷 HEADER */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
            🎯 Budget Planner
          </h2>
          <p className="text-gray-500 text-sm">
            Plan your monthly spending wisely
          </p>
        </div>

        {/* 🔷 INPUT */}
        <div>
          <label className="text-sm text-gray-600">
            Budget Amount (₹)
          </label>

          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter amount..."
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F8CFF] outline-none transition"
          />

          <p className="text-xs text-gray-400 mt-1">
            Example: ₹5000 for monthly budget
          </p>
        </div>

        {/* 🔷 DISPLAY CARD */}
        <div className="bg-[#EAF2FF] p-5 rounded-2xl text-center border border-blue-100">

          <p className="text-gray-500 text-sm">
            Current Budget
          </p>

          <h2 className="text-3xl font-semibold text-[#4F8CFF] mt-1">
            ₹{budget || 0}
          </h2>

          <p className="text-xs text-gray-500 mt-2">
            Budget is active ✔️
          </p>
        </div>

        {/* 🔷 QUICK INFO */}
        <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 space-y-1 border border-gray-100">
          <p>📌 Set a realistic budget</p>
          <p>📊 Track expenses daily</p>
          <p>💡 Avoid unnecessary spending</p>
        </div>

        {/* 🔷 FOOTER */}
        <p className="text-xs text-gray-400 text-center">
          💡 Consistency is the key to better financial habits
        </p>

      </div>
    </div>
  );
}

export default Goals;