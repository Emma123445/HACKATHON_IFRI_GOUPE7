import cron from 'node-cron';
import reminderJob from './reminderJob.js';

console.log('CRON lancé...');

// Toutes les minutes : */1 * * * *
// Toutes les heures : 0 * * * *
cron.schedule('*/1 * * * *', async () => {
  console.log(`[${new Date().toLocaleTimeString()}] Exécution du job de rappel...`);
  await reminderJob();
});
console.log('CRON terminé.');