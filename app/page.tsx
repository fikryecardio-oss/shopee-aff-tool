import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import AIReviewGenerator from '@/components/AIReviewGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <header className="mb-8 px-6">
          <h1 className="text-4xl font-bold text-gray-900">
            🚀 Shopee Affiliate Manager
          </h1>
          <p className="text-gray-600 mt-2">
            Tingkatkan pendapatan affiliate dengan AI & analytics
          </p>
        </header>

        <div className="space-y-8">
          <AnalyticsDashboard />
          <AIReviewGenerator />
        </div>
      </div>
    </main>
  );
}