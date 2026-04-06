import { NextRequest, NextResponse } from "next/server";

const CLOUD = "dzsq6win3";

// These are your actual public IDs from Cloudinary
// No API keys needed - direct public URLs
const FOLDER_IMAGES: Record<string, string[]> = {
  Flag_Design: [
    "flag_design_abetne",
    "flag_design_21_y6oxdx",
  ],
  Dishwasher: [
    "Diswasher_magnet_5_tyh5ny",
    "Diswasher_magnet_7_kxurtv",
  ],
  Metal_Indoor_signs: [
    "metal_indoor_signs_47_r2dnao",
    "metal_indoor_signs_7_s6s8ii",
  ],
  custom_Table_runner: [
    "Custom_Table_Runner_cs3haz",
    "Custom_Table_Runner_10_wa8zqp",
  ],
  Tapestry_art: [
    "TAPESTRY_9_erdg1p",
  ],
  Wall_Canvas: [
    "WALLCANVAS_8_aimsbu",
  ],
  Wall_canvas_set_3: [
    "Wall_canvas_set_3_7_s0f153",
  ],
  Large_Banner: [
    "Large_custom_Banners_12_bmquvm",
  ],
};

export async function GET(request: NextRequest) {
  const folder = new URL(request.url).searchParams.get("folder");

  const folders = folder ? [folder] : Object.keys(FOLDER_IMAGES);

  const resources = folders.flatMap(f =>
    (FOLDER_IMAGES[f] || []).map(id => ({
      public_id: id,
      url: `https://res.cloudinary.com/${CLOUD}/image/upload/${id}.png`,
      folder: f,
    }))
  );

  return NextResponse.json({ resources });
}