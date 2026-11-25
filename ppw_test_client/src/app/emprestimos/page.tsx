import { getAllEmprestimos } from '@/features/emprestimos/api/emprestimo.actions';
import { EmprestimosTable } from '@/features/emprestimos/components/EmprestimosTable';
import { Button } from '@/components/ui/button';
import { BookMarked, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EmprestimosPage() {
  const initialData = await getAllEmprestimos();

  return (
    <main className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <BookMarked className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Sistema de Controle de Empréstimos e Reservas
              </h1>
              <p className="text-sm text-muted-foreground">
                Atividade 4 — Resiliência Visual (Error Boundaries) e Monitoramento de Erros com GlitchTip
              </p>
            </div>
          </div>

          <Link href="/emprestimos/testes-falha">
            <Button variant="outline" className="gap-2 border-red-200 text-red-700 hover:bg-red-50">
              <ShieldAlert className="h-4 w-4" />
              Simulador de Falhas (GlitchTip)
            </Button>
          </Link>
        </div>

        {/* Tabela de Dados e Ações com Dialogs */}
        <EmprestimosTable initialData={initialData} />
      </div>
    </main>
  );
}
