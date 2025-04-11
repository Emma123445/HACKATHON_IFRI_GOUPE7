
import React from 'react';
import Layout from '@/components/layout/Layout';

const Records = () => {
  return (
    <Layout title="Dossiers Médicaux">
      <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Module en développement</h2>
        <p className="text-muted-foreground">
          La gestion des dossiers médicaux détaillés sera disponible dans une prochaine mise à jour.
        </p>
      </div>
    </Layout>
  );
};

export default Records;
