import prisma from "@/lib/prisma";

export default async function DataTable({ table, q }: { table: string, q: string }) {
  let data: any[] = [];
  let count = 0;

  const isNumeric = q && !isNaN(Number(q));
  const numericQ = isNumeric ? Number(q) : undefined;

  try {
    switch (table) {
      case "customers": {
        const where = q ? {
          OR: [
            isNumeric ? { customer_id: numericQ } : undefined,
            { name: { contains: q, mode: 'insensitive' } as any },
            { email: { contains: q, mode: 'insensitive' } as any },
          ].filter(Boolean) as any
        } : {};
        count = await prisma.customers.count({ where });
        data = await prisma.customers.findMany({ where, take: 50 });
        break;
      }
      case "products": {
        const where = q ? {
          OR: [
            isNumeric ? { product_id: numericQ } : undefined,
            { product_name: { contains: q, mode: 'insensitive' } as any },
            { sku: { contains: q, mode: 'insensitive' } as any },
            { category: { contains: q, mode: 'insensitive' } as any },
          ].filter(Boolean) as any
        } : {};
        count = await prisma.products.count({ where });
        data = await prisma.products.findMany({ where, take: 50 });
        break;
      }
      case "orders": {
        const where = q ? {
          OR: [
            isNumeric ? { order_id: numericQ } : undefined,
            isNumeric ? { customer_id: numericQ } : undefined,
            { status: { contains: q, mode: 'insensitive' } as any },
          ].filter(Boolean) as any
        } : {};
        count = await prisma.orders.count({ where });
        data = await prisma.orders.findMany({ where, take: 50 });
        break;
      }
      case "order_items": {
        const where = q ? {
          OR: [
            isNumeric ? { order_item_id: numericQ } : undefined,
            isNumeric ? { order_id: numericQ } : undefined,
            isNumeric ? { product_id: numericQ } : undefined,
          ].filter(Boolean) as any
        } : {};
        count = await prisma.order_items.count({ where });
        data = await prisma.order_items.findMany({ where, take: 50 });
        break;
      }
      default:
        return <div className="text-red-400 p-4 bg-red-500/10 rounded-lg">Invalid table selected.</div>;
    }
  } catch (error: any) {
    return <div className="text-red-400 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
      <strong>Query Error:</strong> {error.message}
    </div>;
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-black/20 rounded-xl border border-white/5">
        <span className="text-4xl block mb-3">🔍</span>
        <p className="text-slate-400">No records found matching "{q}".</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-200 capitalize tracking-wide flex items-center gap-2">
          <span className="p-1.5 bg-blue-500/20 text-blue-400 rounded-md">🗃️</span>
          {table.replace("_", " ")} Data
        </h3>
        <span className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold tracking-wider uppercase border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          Showing {data.length} of {count.toLocaleString()} rows
        </span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/50 shadow-2xl">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-black/40 border-b border-white/10 text-slate-400 uppercase tracking-wider text-xs font-bold">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-5 py-4">{col.replace(/_/g, " ")}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors group">
                {columns.map((col) => {
                  let val = row[col];
                  if (val instanceof Date) val = val.toLocaleString();
                  if (typeof val === 'object' && val !== null) val = val.toString(); 
                  return (
                    <td key={col} className="px-5 py-4 text-slate-300 group-hover:text-white transition-colors">
                      {val?.toString() || "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {count > 50 && (
        <p className="text-center text-xs text-slate-500 mt-5 bg-black/20 p-2 rounded-lg inline-block mx-auto">
          * Displaying only the first 50 results for performance. Refine your search to see more.
        </p>
      )}
    </div>
  );
}
