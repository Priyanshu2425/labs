import { ImageResponse } from 'next/og';
import { productsData } from '@/data/products';

export const alt = 'DIMSSU Labs product';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return Object.keys(productsData).map((id) => ({ id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductOgImage({ params }: Props) {
  const { id } = await params;
  const product = productsData[id];
  const title = product?.title ?? 'DIMSSU Labs';
  const subtitle =
    product?.subtitle ??
    'AI-native product studio building custom AI solutions and production software.';
  const categories = product?.categories?.join(' · ') ?? 'AI · Engineering';
  const status = product?.status === 'live' ? 'Live in production' : 'Prototype';
  const statusColor = product?.status === 'live' ? '#4ade80' : '#fbbf24';

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
            'radial-gradient(900px 500px at 80% 0%, #1e1b4b 0%, #0a0a0a 60%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundImage: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              }}
            />
            <div style={{ display: 'flex', fontSize: 26, fontWeight: 600 }}>DIMSSU Labs</div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '8px 16px',
              borderRadius: 999,
              fontSize: 18,
              color: statusColor,
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {status}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: '#a78bfa',
              textTransform: 'uppercase',
              letterSpacing: 3,
            }}
          >
            {categories}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: '#d4d4d8',
              lineHeight: 1.35,
              maxWidth: 1040,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#71717a', width: '100%' }}>
          <div style={{ display: 'flex' }}>labs.dimssu.ai/product/{id}</div>
          <div style={{ display: 'flex' }}>AI-Native Engineering</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
