
export default function handler(req, res) {
  const stars = parseInt(process.env.STARS || '0', 10);
  res.status(200).json({ stars });
}
