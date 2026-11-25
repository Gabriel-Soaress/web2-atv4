import { SimuladorFalhasPanel } from '@/features/emprestimos/components/SimuladorFalhasPanel';
import { ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function consultarAcervoComFalhaSimulada() {
  await new Promise((resolve) => setTimeout(resolve, 150));
  throw new Error(
    'Falha assíncrona no Server Component: erro ao consultar disponibilidade de livros/equipamentos no PostgreSQL institucional.',
  );
}

export default async function TestesFalhaPage({
  searchParams,
}: {
  searchParams: Promise<{ erroServidor?: string }>;
}) {
  const params = await searchParams;

  if (params.erroServidor === 'true') {
    await consultarAcervoComFalhaSimulada();
  }

  return (
    <main className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="p-2.5 bg-red-100 rounded-xl text-red-700">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Painel de Resiliência e Simulação de Falhas (GlitchTip)
            </h1>
            <p className="text-sm text-muted-foreground">
              Atividade 4 — Disparadores intencionais para validar Error Boundaries (error.tsx, global-error.tsx) e telemetria no GlitchTip
            </p>
          </div>
        </div>

        <SimuladorFalhasPanel />
      </div>
    </main>
  );
}
