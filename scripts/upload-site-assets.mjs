// One-off script: uploads everything in public/hero and public/modules
// into the `site-assets` Supabase Storage bucket, preserving the same
// folder structure (hero/xxx.jpg, modules/xxx.jpg).
//
// Usage:
//   SUPABASE_URL=https://xxxx.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
//   node scripts/upload-site-assets.mjs
//
// Uses the SERVICE ROLE key (not anon) because it needs to bypass RLS to
// write. Never expose the service role key to the browser/client bundle —
// this script only runs locally/in CI.

import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync } from "fs";
import { join, extname } from "path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "site-assets";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars. See usage comment at top of this file."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

const FOLDERS = ["public/hero", "public/modules"];

async function uploadFolder(localFolder) {
  const folderName = localFolder.split("/").pop(); // "hero" or "modules"
  let files;
  try {
    files = readdirSync(localFolder);
  } catch {
    console.warn(`Skipping ${localFolder} (not found)`);
    return;
  }

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const contentType = CONTENT_TYPES[ext];
    if (!contentType) continue; // skip .gitkeep etc.

    const localPath = join(localFolder, file);
    const remotePath = `${folderName}/${file}`;
    const fileBuffer = readFileSync(localPath);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(remotePath, fileBuffer, { contentType, upsert: true });

    if (error) {
      console.error(`✗ ${remotePath}: ${error.message}`);
    } else {
      console.log(`✓ uploaded ${remotePath}`);
    }
  }
}

for (const folder of FOLDERS) {
  await uploadFolder(folder);
}

console.log("Done.");
