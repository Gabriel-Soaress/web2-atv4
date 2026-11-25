'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      level: 'fatal',
      tags: {
        modulo: 'root-layout',
        boundary: 'global-error',
        tema: '08-controle-emprestimos',
      },
      extra: {
        digest: error.digest,
      },
    });
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '24px',
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid #fecaca',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            Erro Crítico Global (Root Boundary)
          </div>

          <h1 style={{ fontSize: '22px', color: '#0f172a', margin: '0 0 12px 0' }}>
            Falha estrutural no Controle de Empréstimos
          </h1>

          <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: '0 0 20px 0' }}>
            Ocorreu uma exceção crítica capturada pelo <code>global-error.tsx</code>.
            O stacktrace completo foi encaminhado para análise no painel do <strong>GlitchTip</strong>.
          </p>

          <div
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'left',
              marginBottom: '24px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Mensagem do Erro:
            </div>
            <div style={{ fontSize: '13px', fontFamily: 'monospace', color: '#b91c1c', wordBreak: 'break-word' }}>
              {error.message || 'Erro crítico não tratado no layout raiz.'}
            </div>
            {error.digest && (
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#64748b', marginTop: '6px' }}>
                Digest: {error.digest}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Recuperar aplicação (reset)
            </button>
            <button
              onClick={() => {
                window.location.href = '/emprestimos';
              }}
              style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Ir para /emprestimos
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
