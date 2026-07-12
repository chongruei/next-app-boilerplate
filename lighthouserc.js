// Core Web Vitals (LCP, CLS) use Google's "Good" boundaries from
// https://web.dev/articles/vitals; FCP/TBT/Speed Index are
// project-specific performance budgets informed by, but not a direct
// copy of, that same guidance. aggregationMethod is explicit because
// LHCI defaults to "optimistic" (best-of-numberOfRuns) — with 3 runs
// configured below, that silently picks the most favorable run
// instead of a representative one.
//
// LCP is set higher than web.dev's 2500ms "Good" boundary based on
// real GitHub Actions data, not local measurement: across two CI runs
// on shared runners, LCP varied 2112-2861ms and which page was
// slowest flipped between runs (a static page with no data fetching
// was as slow as the one page that does an SSR external-API prefetch)
// — this is runner-to-runner noise, not a per-page cost, so all pages
// share one budget with headroom over the worst observed value.
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/about',
        'http://localhost:3000/en/config',
        'http://localhost:3000/en/query'
      ]
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8, aggregationMethod: 'median' }],
        'largest-contentful-paint': [
          'error',
          { maxNumericValue: 3200, aggregationMethod: 'median' }
        ],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'median' }],
        'total-blocking-time': ['error', { maxNumericValue: 300, aggregationMethod: 'median' }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000, aggregationMethod: 'median' }],
        'speed-index': ['error', { maxNumericValue: 3000, aggregationMethod: 'median' }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci'
    }
  }
}
