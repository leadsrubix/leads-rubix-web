/**
 * Postgres logical backup driver. Streams `pg_dump --format=custom` to a
 * timestamped file under ./backups, then prunes anything older than RETAIN_DAYS
 * (default 14). Designed to be run from a host cron — Hostinger Cloud cron
 * works fine: `0 3 * * * cd /var/www/leadrubix && pnpm --filter @workspace/scripts run backup`.
 *
 * Required env: DATABASE_URL. Optional: BACKUP_DIR, RETAIN_DAYS.
 */
import "dotenv/config";
import { spawn } from "node:child_process";
import { mkdir, readdir, stat, unlink } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const dir = process.env.BACKUP_DIR ?? path.resolve(process.cwd(), "backups");
const retainDays = Number(process.env.RETAIN_DAYS ?? 14);

async function run() {
  await mkdir(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = path.join(dir, `leadsrubix-${stamp}.dump`);
  console.log(`[backup] starting → ${file}`);

  await new Promise<void>((resolve, reject) => {
    const child = spawn("pg_dump", ["--format=custom", "--no-owner", "--no-acl", url!], {
      stdio: ["ignore", "pipe", "inherit"],
    });
    const out = createWriteStream(file);
    child.stdout.pipe(out);
    child.on("error", reject);
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`pg_dump exit ${code}`))));
  });

  const cutoff = Date.now() - retainDays * 86_400_000;
  const entries = await readdir(dir);
  for (const name of entries) {
    if (!name.startsWith("leadsrubix-") || !name.endsWith(".dump")) continue;
    const full = path.join(dir, name);
    const s = await stat(full);
    if (s.mtimeMs < cutoff) {
      await unlink(full);
      console.log(`[backup] pruned ${name}`);
    }
  }
  console.log("[backup] done");
}

run().catch((err) => {
  console.error("[backup] failed:", err);
  process.exit(1);
});
