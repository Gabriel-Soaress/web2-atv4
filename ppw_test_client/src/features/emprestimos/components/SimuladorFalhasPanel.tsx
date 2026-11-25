'use client';

import { useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { Bug, ServerCrash, ShieldAlert, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SimuladorFalhasPanel() {
  const [deveQuebrarClient, setDeveQuebrarClient] = useState(false);
  const [eventoEnviado, setEventoEnviado] = useState<string | null>(null);

  if (deveQuebrarClient) {
    throw new Error('Falha ao processar formulário no client');
  }

  function handleEnviarTelemetriaDireta() {
    const err = new Error(
      'Erro de regra de negócio no Tema 08: tentativa de devolução com falha ao calcular multa progressiva no cliente.',
    );
    Sentry.captureException(err, {
      tags: {
        modulo: 'emprestimos',
        tipo: 'captura-manual-regra-negocio',
        tema: '08-controle-emprestimos',
      },
      extra: {
        item: 'Clean Code (Livro)',
        acao: 'devolucao-com-atraso',
      },
    });
    setEventoEnviado(
      'Evento de erro enviado diretamente ao GlitchTip! Confira no painel http://localhost:8000.',
    );
  }

  return (
    <div className="space-y-6">
      {eventoEnviado && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-medium">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>{eventoEnviado}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Cenário 1: Erro de Renderização Client-side */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm">
              <Bug className="h-5 w-5" />
              <span>Disparador 01 — Renderização Client-side</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Erro no Formulário de Reserva (error.tsx + reset)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Força uma exceção síncrona durante a renderização do componente React
              (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">throw new Error(&quot;Falha ao processar formulário no client&quot;)</code>).
              Aciona o <strong>error.tsx</strong> da rota, envia o stacktrace ao GlitchTip e permite recuperar via <code>reset()</code>.
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={() => setDeveQuebrarClient(true)}
            className="w-full gap-2"
          >
            <Bug className="h-4 w-4" />
            Disparar Erro Client-side
          </Button>
        </div>

        {/* Cenário 2: Erro Assíncrono / Server Component */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-600 font-semibold text-sm">
              <ServerCrash className="h-5 w-5" />
              <span>Disparador 02 — Server Component / Banco</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Falha Assíncrona de Acervo no Servidor
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Simula queda de conexão com o banco PostgreSQL institucional ou falha no fetch antes da renderização do Server Component,
              acionando o <strong>error.tsx</strong> com <code>digest</code> de servidor e rastreamento no GlitchTip.
            </p>
          </div>
          <Link href="/emprestimos/testes-falha?erroServidor=true" className="w-full">
            <Button variant="destructive" className="w-full gap-2">
              <ServerCrash className="h-4 w-4" />
              Disparar Erro no Server Component
            </Button>
          </Link>
        </div>

        {/* Cenário 3: Erro Crítico Global */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-700 font-semibold text-sm">
              <ShieldAlert className="h-5 w-5" />
              <span>Disparador 03 — Colapso Raiz (global-error.tsx)</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Erro Crítico Global de Sistema
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Navega para uma rota fora da boundary de empréstimos que lança exceção fatal,
              acionando o <strong>app/global-error.tsx</strong> (renderizando tags próprias <code>&lt;html&gt;</code> e <code>&lt;body&gt;</code>) e enviando com nível <code>fatal</code>.
            </p>
          </div>
          <Link href="/simular-erro-global" className="w-full">
            <Button variant="destructive" className="w-full gap-2">
              <ShieldAlert className="h-4 w-4" />
              Disparar Global Error Boundary
            </Button>
          </Link>
        </div>

        {/* Cenário 4: Telemetria Direta de Regra de Negócio */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
              <Send className="h-5 w-5" />
              <span>Disparador 04 — Captura Direta de Negócio</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Telemetria de Falha em Multa Progressiva
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Captura uma exceção controlada de regra de negócio do Tema 08 sem derrubar a tela,
              enviando tags customizadas e metadados extras diretamente ao painel do GlitchTip.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleEnviarTelemetriaDireta}
            className="w-full gap-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50"
          >
            <Send className="h-4 w-4" />
            Enviar Evento ao GlitchTip
          </Button>
        </div>
      </div>

      <div className="pt-2">
        <Link href="/emprestimos">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Painel de Empréstimos
          </Button>
        </Link>
      </div>
    </div>
  );
}
