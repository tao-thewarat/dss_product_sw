import prisma from "@/lib/prisma";
import ExplorerControls from "./components/ExplorerControls";
import DataTable from "./components/DataTable";

export const dynamic = "force-dynamic";

export default async function Home(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const table = typeof searchParams?.table === 'string' ? searchParams.table : 'customers';
  const q = typeof searchParams?.q === 'string' ? searchParams.q : '';

  // 1. Fetch Key Metrics
  const totalCustomers = await prisma.customers.count();
  const totalProducts = await prisma.products.count();
  const totalOrders = await prisma.orders.count();
  
  // Calculate total revenue using Raw SQL
  const revenueResult = await prisma.$queryRaw<{total: number}[]>`
    SELECT SUM(quantity * unit_price_at_purchase) as total FROM "order_items"
  `;
  const totalRevenue = revenueResult[0]?.total ? Number(revenueResult[0].total) : 0;

  return (
    <main className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4 md:p-8 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              OLTP <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-slate-400 mt-2">Real-time mock transaction processing overview</p>
          </div>
          <div className="flex items-center space-x-3 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium text-sm tracking-wide">SYSTEM ONLINE</span>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Total Revenue" value={`฿${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon="💰" color="from-green-500 to-emerald-400" />
          <MetricCard title="Total Orders" value={totalOrders.toLocaleString()} icon="📦" color="from-blue-500 to-cyan-400" />
          <MetricCard title="Customers" value={totalCustomers.toLocaleString()} icon="👥" color="from-purple-500 to-fuchsia-400" />
          <MetricCard title="Products" value={totalProducts.toLocaleString()} icon="🛍️" color="from-orange-500 to-amber-400" />
        </div>

        {/* Data Explorer Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold mb-2 text-white">
              Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Explorer</span>
            </h2>
            <p className="text-slate-400">Select a table and filter records dynamically.</p>
          </div>

          <div className="glass-panel p-6 shadow-2xl bg-slate-900/40">
            <ExplorerControls />
            <div className="mt-8">
              {/* Suspense boundary could go here if we wanted streaming, but async components inside async page work too */}
              <DataTable table={table} q={q} />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

// Helper Component for Metrics
function MetricCard({ title, value, icon, color }: { title: string, value: string, icon: string, color: string }) {
  return (
    <div className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden group">
      <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-slate-400 font-medium text-sm tracking-wide uppercase">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-extrabold text-white tracking-tight relative z-10">{value}</p>
    </div>
  );
}
