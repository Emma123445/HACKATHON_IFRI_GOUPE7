
import React from 'react';
import Layout from '@/components/layout/Layout';

const Statistics = () => {
  return (
    <Layout title="Statistiques">
      <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Module en développement</h2>
        <p className="text-muted-foreground">
          Le module d'analyse statistique détaillée sera disponible dans une prochaine version.
        </p>
      </div>
    </Layout>
  );
};

export default Statistics;
