import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DIMSSU Labs — India\'s First AI-Native Product Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(1000px 600px at 20% 10%, #1a1a2e 0%, #0a0a0a 60%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundImage: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            }}
          />
          <div style={{ display: 'flex', fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>
            DIMSSU Labs
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            India&apos;s First AI-Native Product Studio
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: '#a1a1aa',
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            Custom AI · Intelligent automation · Production software · 24h prototypes
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#71717a',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex' }}>labs.dimssu.ai</div>
          <div style={{ display: 'flex' }}>AI-Native · Engineering Lab</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
