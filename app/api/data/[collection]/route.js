let db = {};

export async function GET(req, context) {
  const { collection } = await context.params;
  return Response.json(db[collection] || []);
}

export async function POST(req, context) {
  const { collection } = await context.params;
  const body = await req.json();

  if (!db[collection]) {
    db[collection] = [];
  }

  db[collection].push(body);

  return Response.json({ success: true });
}