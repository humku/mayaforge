import { NextRequest, NextResponse } from "next/server";

const CLOUD_NAME = "dzsq6win3";
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
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${folder}.json`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.resources || []).map((r: { public_id: string }) => ({
    public_id: r.public_id,
    url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_800/${r.public_id}.png`,
    folder,
  }));
}

export async function GET(request: NextRequest) {
  const folder = new URL(request.url).searchParams.get("folder");
  try {
    if (folder) {
      return NextResponse.json({ resources: await fetchFolder(folder) });
    }
    const all = await Promise.all(FOLDERS.map(fetchFolder));
    return NextResponse.json({ resources: all.flat() });
  } catch {
    return NextResponse.json({ resources: [] }, { status: 500 });
  }
}