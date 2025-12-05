#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

console.log("🚀 Starting optimized build process...\n");

// Check if we can skip post-build steps
const shouldSkipPostBuild = () => {
  const cacheFile = path.join(process.cwd(), ".build-cache.json");

  if (!fs.existsSync(cacheFile)) return false;

  try {
    const cache = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    const blogDir = path.join(process.cwd(), "pages", "blog");
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

    // Check if any files have changed
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const stats = fs.statSync(filePath);
      const hash = crypto.createHash("md5").update(fs.readFileSync(filePath)).digest("hex");

      if (cache.files?.[file] !== hash) {
        return false;
      }
    }

    return cache.lastBuild > Date.now() - 24 * 60 * 60 * 1000; // 24 hours
  } catch (error) {
    return false;
  }
};

const updateCache = () => {
  const cacheFile = path.join(process.cwd(), ".build-cache.json");
  const blogDir = path.join(process.cwd(), "pages", "blog");
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

  const cache = {
    lastBuild: Date.now(),
    files: {},
  };

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const hash = crypto.createHash("md5").update(fs.readFileSync(filePath)).digest("hex");
    cache.files[file] = hash;
  }

  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
};

const runCommand = (command, description) => {
  console.log(`📦 ${description}...`);
  const start = Date.now();

  try {
    if (command.includes("&") && command.includes("wait")) {
      // Run parallel commands
      const commands = command.split(" & ").filter((cmd) => cmd !== "wait");
      const promises = commands.map((cmd) => {
        return new Promise((resolve, reject) => {
          const child = spawn(cmd, { shell: true, stdio: "inherit" });
          child.on("close", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Command failed: ${cmd}`));
          });
        });
      });

      return Promise.all(promises).then(() => {
        const duration = Date.now() - start;
        console.log(`✅ ${description} completed in ${duration}ms\n`);
      });
    } else {
      execSync(command, { stdio: "inherit" });
      const duration = Date.now() - start;
      console.log(`✅ ${description} completed in ${duration}ms\n`);
    }
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    throw error;
  }
};

async function main() {
  const startTime = Date.now();

  try {
    // Run Next.js build with optimizations
    await runCommand("yarn build:fast", "Building Next.js application");

    // Check if we can skip post-build steps
    if (shouldSkipPostBuild()) {
      console.log("⏭️  Skipping post-build steps (no changes detected)\n");
    } else {
      // Run post-build steps in parallel
      await runCommand(
        "next-sitemap & node scripts/generate-rss.js & node scripts/generate-blog-data.js & node scripts/generate-sitemap-extra.js & wait",
        "Running post-build tasks (parallel)"
      );

      // Update cache
      updateCache();
    }

    const totalTime = Date.now() - startTime;
    console.log(`🎉 Build completed successfully in ${(totalTime / 1000).toFixed(2)}s`);

    // Show bundle size summary
    const nextBuildInfo = path.join(process.cwd(), ".next", "build-manifest.json");
    if (fs.existsSync(nextBuildInfo)) {
      console.log("\n📊 Build optimization complete!");
      console.log("💡 Tip: Run `yarn analyze` to see detailed bundle analysis");
    }
  } catch (error) {
    console.error("\n❌ Build failed:", error.message);
    process.exit(1);
  }
}

main();
