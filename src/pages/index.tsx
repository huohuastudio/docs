import type { ReactNode } from 'react'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'

const products = [
  {
    title: 'Novaix',
    description: '一站式 IDC 管理系统，面向中小 VPS 服务商，Go + React 单二进制部署，开箱即用。',
    logo: '/img/novaix-logo.png',
    link: '/novaix/introduce',
  },
  {
    title: 'Lsky Pro+',
    description: '云端相册系统，支持多种第三方储存、图片审核、付费套餐等功能，Laravel 框架开发。',
    logo: '/img/logo.png',
    link: '/lsky/guide/introduce',
  },
]

export default function Home(): ReactNode {
  return (
    <Layout title="产品文档中心" description="Spark Studio 产品文档中心">
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 60px)',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          产品文档中心
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--ifm-menu-color)', marginBottom: '3rem' }}>
          选择一个产品查看文档
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '700px',
            width: '100%',
          }}
        >
          {products.map((product) => (
            <Link
              key={product.title}
              to={product.link}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem 1.5rem',
                border: '1px solid var(--ifm-toc-border-color)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--ifm-color-primary)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(246, 130, 31, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--ifm-toc-border-color)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <img
                src={product.logo}
                alt={product.title}
                style={{ width: 64, height: 64, borderRadius: 12, marginBottom: '1rem' }}
              />
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>{product.title}</h3>
              <p
                style={{
                  margin: 0,
                  textAlign: 'center',
                  fontSize: '0.9rem',
                  color: 'var(--ifm-menu-color)',
                }}
              >
                {product.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  )
}
