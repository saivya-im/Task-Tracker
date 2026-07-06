const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxhyZHHhhACOFW_xLJVMbgT8HGUOb6bPWG4TZ7gDOYmooOqp6oEHaufL5CjMBlNjxdf/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(req.body),
    });
    const text = await response.text();
    try {
      res.status(200).json(JSON.parse(text));
    } catch {
      res.status(200).json({ success: true, raw: text });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
