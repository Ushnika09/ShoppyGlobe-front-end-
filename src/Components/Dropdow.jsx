import React from "react";

function Dropdow({ categories, categoryChange, onSort ,category,
  sortOpt}) {
    
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="flex flex-row gap-5 justify-between">
      <div className="relative ">
        <select
          value={category}
          className="lg:px-5.5 lg:py-2.5 px-2.5 py-2.5 pr-[2.5rem] rounded-lg border border-gray-400/40  appearance-none lg:pr-[4rem] focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] "
          onChange={(e) => categoryChange(e.target.value)}
        >
          <option className="px-2.5 " value="all">
            All categories
          </option>
          {categories.map((cat, i) => {
            return (
              <option key={i} className="" value={cat}>
                {capitalize(cat)}
              </option>
            );
          })}
        </select>

        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
          ▼
        </span>
      </div>

      <div className="relative ">
        <select
          value={sortOpt}
          className="lg:px-5.5 lg:py-2.5 px-2.5 py-2.5 pr-[2rem] rounded-lg border border-gray-400/40  appearance-none lg:pr-[4rem] focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] "
          onChange={(e) => onSort(e.target.value)}
        >
          <option className="px-2.5" value="default">
            Default
          </option>
          <option className="px-2.5" value="a-z">
            Name A–Z
          </option>
          <option className="px-2.5" value="high-low">
            Prices: High → Low
          </option>
          <option className="px-2.5" value="low-high">
            Prices: Low → High
          </option>
          <option className="px-2.5" value="rating">
            Ratings: 4+
          </option>
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
          ▼
        </span>
      </div>
    </div>
  );
}

export default Dropdow;
