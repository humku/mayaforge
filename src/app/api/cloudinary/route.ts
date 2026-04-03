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
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.resources || []).map((r: { public_id: string; width: number; height: number }) => ({
    public_id: r.public_id,
    secure_url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${r.public_id}`,
    width: r.width,
    height: r.height,
    folder,
  }));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");

  try {
    if (folder) {
      const resources = await fetchFolder(folder);
      return NextResponse.json({ resources });
    }
    const results = await Promise.all(FOLDERS.map(fetchFolder));
    const resources = results.flat();
    return NextResponse.json({ resources });
  } catch (err) {
    console.error("[CLOUDINARY API]", err);
    return NextResponse.json({ error: "Failed to fetch images", resources: [] }, { status: 500 });
  }
}