export default function handler(req, res) {
  if (req.method === 'POST') {
    // Semplice simulazione: +2 stelle
    return res.status(200).json({ stelle: 5 });
  }
  res.status(405).end();
}
