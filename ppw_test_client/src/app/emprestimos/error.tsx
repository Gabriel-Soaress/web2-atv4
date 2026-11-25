'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, RefreshCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EmprestimosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: {
        modulo: 'emprestimos',
        boundary: 'route-error',
        tema: '08-controle-emprestimos',
      },
      extra: {
        digest: error.digest,
      },
    });
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white border border-red-200 rounded-2xl shadow-sm p-8 space-y-6 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-100 text-red-700">
            Falha no Módulo de Empréstimos
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Não foi possível processar o acervo de empréstimos
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Ocorreu uma falha inesperada ao carregar os livros e equipamentos ou ao validar a operação de empréstimo.
            Os detalhes técnicos já foram enviados automaticamente para o monitoramento no <strong>GlitchTip</strong>.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase">Detalhe técnico capturado:</p>
          <p className="text-sm font-mono text-red-700 break-words">
            {error.message || 'Erro desconhecido ao acessar o módulo de empréstimos.'}
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-slate-500 pt-1">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()} className="w-full sm:w-auto gap-2">
            <RefreshCcw className="h-4 w-4" />
            Tentar novamente
          </Button>
          <Link href="/emprestimos" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao painel
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
