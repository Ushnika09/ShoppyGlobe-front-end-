import React, { useContext }  from "react";
import filter from "../assets/filter.png";
import Dropdow from "./Dropdow";
import SearchContext from "./SearchContext";


function Actions({categories,categoryChange,onSort,clearFilters,category,sortOpt}) {

  let { searchItems,setSearchItems } = useContext(SearchContext);

  const isFiltered =category !== "all" || sortOpt !== "" || (searchItems.trim() !== "");
  
  return (
    <div className="flex md:flex-row flex-col gap-5 justify-between items-center px-[1.3rem] py-[1.5rem]  bg-neutral-100">
      <div className="flex items-center  md:flex-row flex-col gap-5">
        <div className="flex items-center gap-3">
          <img className="h-[2rem] " src={filter} alt="" />
          <h1 className="text-xl font-medium">Filters:</h1>
        </div>
        <Dropdow
          categories={categories}
          categoryChange={categoryChange}
          onSort={onSort}
          category={category}
          sortOpt={sortOpt}
        />
        
      </div>
      {
        isFiltered && (
          <button
        className="lg:px-5.5 lg:py-2.5 px-2.5 py-2.5 rounded-lg border border-gray-400/40 shrink-0 "
        onClick={clearFilters}
      >
        Clear Filters
      </button>
        )
      }
    </div>
  );
}

export default Actions;
