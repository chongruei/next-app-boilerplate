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
        // Core Web Vitals + overall performance budget, thresholds match
        // Google's "Good" boundaries: https://web.dev/articles/vitals
        'categories:performance': ['error', { minScore: 0.8 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'speed-index': ['error', { maxNumericValue: 3000 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci'
    }
  }
}
