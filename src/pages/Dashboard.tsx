
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" subtitle="Resumo do sistema" />
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Vendas Hoje"
              value="R$ 3.254,50"
              description="Total de vendas"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              }
              trend="up"
              trendValue="12%"
            />
            <StatCard
              title="Pedidos Hoje"
              value="42"
              description="Total de pedidos"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              }
              trend="up"
              trendValue="8%"
            />
            <StatCard
              title="Ticket Médio"
              value="R$ 77,49"
              description="Valor médio por pedido"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              }
              trend="up"
              trendValue="3%"
            />
            <StatCard
              title="Itens Baixos"
              value="7"
              description="Produtos com estoque baixo"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
                  <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
                  <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
                </svg>
              }
              trend="down"
              trendValue="2 itens"
              className="border-l-4 border-pdv-danger"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-card rounded-lg p-6 shadow">
              <h2 className="text-lg font-medium mb-4">Vendas dos Últimos 7 dias</h2>
              <div className="h-64 flex items-center justify-center border-t pt-4 mt-2">
                <div className="text-muted-foreground">Gráfico de vendas será exibido aqui</div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="text-lg font-medium mb-4">Produtos Mais Vendidos</h2>
              <div className="space-y-4">
                {["X-Bacon", "Batata Frita", "Coca-Cola", "Pizza", "Açaí"].map((item, index) => (
                  <div key={index} className="flex items-center justify-between pb-2 border-b">
                    <span>{item}</span>
                    <span className="font-medium">{Math.floor(Math.random() * 100) + 10} un</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="text-lg font-medium mb-4">Pedidos Recentes</h2>
              <div className="space-y-2">
                {Array.from({length: 5}).map((_, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        index % 3 === 0 ? "bg-pdv-accent" : 
                        index % 3 === 1 ? "bg-pdv-secondary" : "bg-pdv-primary"
                      }`}></div>
                      <span>Pedido #{1000 + index}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {index % 3 === 0 ? "Mesa 3" : 
                         index % 3 === 1 ? "Delivery" : "Retirada"}
                      </span>
                      <span className="font-medium">R$ {(Math.random() * 100 + 20).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="text-lg font-medium mb-4">Formas de Pagamento</h2>
              <div className="h-64 flex items-center justify-center border-t pt-4 mt-2">
                <div className="text-muted-foreground">Gráfico de pagamentos será exibido aqui</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
