import { NextRequest, NextResponse } from "next/server";

const CLOUD      = "dzsq6win3";
const API_KEY    = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

const FOLDERS = [
  "Flag_Design",
  "Tapestry_art",
  "Metal_Indoor_signs",
  "Large_Banner",
  "Dishwasher",
  "custom_Table_runner",
  "Wall_Canvas",
  "Wall_canvas_set_3",
];

async function fetchFolder(folder: string) {
  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  const url  = `https://api.cloudinary.com/v1_1/${CLOUD}/resources/image?prefix=${folder}&type=upload&max_results=500`;
  
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
  });

  if (!res.ok) {
    console.error(`Cloudinary error for ${folder}: ${res.status} ${res.statusText}`);
    return [];
  }

  const data = await res.json();
  return (data.resources || []).map((r: { public_id: string }) => ({
    public_id: r.public_id,
    url: `https://res.cloudinary.com/${CLOUD}/image/upload/${r.public_id}.png`,
    folder,
  }));
}

export async function GET(request: NextRequest) {
  const folder = new URL(request.url).searchParams.get("folder");
  try {
    if (folder) {
      const resources = await fetchFolder(folder);
      return NextResponse.json({ resources });
    }
    const all = await Promise.all(FOLDERS.map(fetchFolder));
    return NextResponse.json({ resources: all.flat() });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ resources: [] }, { status: 500 });
  }
}