"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExplorerControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentTable = searchParams.get("table") || "customers";
  const currentQuery = searchParams.get("q") || "";

  const [table, setTable] = useState(currentTable);
  const [query, setQuery] = useState(currentQuery);

  // Debounce the query search
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("table", table);
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.push(`/?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(handler);
  }, [table, query, router, searchParams]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">Select Table</label>
        <select 
          value={table}
          onChange={(e) => setTable(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none shadow-inner"
        >
          <option value="customers">Customers</option>
          <option value="products">Products</option>
          <option value="orders">Orders</option>
          <option value="order_items">Order Items</option>
        </select>
      </div>
      <div className="flex-[2]">
        <label className="block text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">Filter Data</label>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search by ID, Name, or Attributes in ${table}...`}
          className="w-full bg-slate-900/80 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-600 shadow-inner"
        />
      </div>
    </div>
  );
}
