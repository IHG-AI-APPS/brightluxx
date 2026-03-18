import React from 'react';

/**
 * PageLoader - Loading fallback for React.lazy() code splitting
 * Used with Suspense boundaries for route-based code splitting
 */
export default function PageLoader({ minimal = false }) {
  if (minimal) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center" data-testid="page-loader">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full" />
          {/* Spinning ring */}
          <div className="absolute inset-0 border-2 border-transparent border-t-cyan-500 rounded-full animate-spin" />
          {/* Inner pulse */}
          <div className="absolute inset-3 bg-cyan-500/10 rounded-full animate-pulse" />
        </div>
        <p className="text-neutral-500 text-sm tracking-wider uppercase">Loading</p>
      </div>
    </div>
  );
}

/**
 * SectionLoader - Loading fallback for lazy-loaded sections within a page
 */
export function SectionLoader({ height = 'h-64' }) {
  return (
    <div className={`${height} flex items-center justify-center bg-neutral-900/30`} data-testid="section-loader">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/**
 * CardLoader - Skeleton loader for cards
 */
export function CardLoader({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-neutral-900/30 rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-video bg-neutral-800/50" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-neutral-800/50 rounded w-3/4" />
            <div className="h-3 bg-neutral-800/50 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
