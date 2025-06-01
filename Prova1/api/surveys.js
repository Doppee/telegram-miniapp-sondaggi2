
let stars = 0;

export default function handler(req, res) {
  if (req.method === 'POST') {
    stars += 10;
    res.status(200).json({ message: 'Risposta registrata', stars });
  } else {
    res.status(200).json({ survey: 'Quanto ti piace Telegram?', options: ['Molto', 'Abbastanza', 'Poco'] });
  }
}
