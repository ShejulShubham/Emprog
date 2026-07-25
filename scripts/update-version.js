const fs = require("fs");
const path = require("path");

// Resolve target meta-data paths
const META_PATH = path.resolve(__dirname, "../meta-data.json");

function parseCommitMessage(fullMsg) {
  let userReleaseNotes = "Performance improvements and bug fixes.";
  
  if (!fullMsg) return { userReleaseNotes };

  // Look for [User Release] section
  const userSectionMatch = fullMsg.match(/\[User Release\]([\s\S]*?)(?=\[Dev Notes\]|$)/i);

  if (userSectionMatch && userSectionMatch[1].trim()) {
    userReleaseNotes = userSectionMatch[1].trim();
  }

  return { userReleaseNotes };
}

function calculateNewVersion(currentVersion, commitMsg) {
  let [major, minor, patch] = currentVersion.split(".").map(Number);

  if (commitMsg.includes("BREAKING CHANGE:")) {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (commitMsg.startsWith("feat:") || commitMsg.includes("feat(")) {
    minor += 1;
    patch = 0;
  } else if (commitMsg.startsWith("fix:") || commitMsg.includes("fix(")) {
    patch += 1;
  } else {
    // Default fallback to patch bump
    patch += 1;
  }

  return `${major}.${minor}.${patch}`;
}

function updateVersion() {
  if (!fs.existsSync(META_PATH)) {
    console.error(`Error: ${META_PATH} not found!`);
    process.exit(1);
  }

  const meta = JSON.parse(fs.readFileSync(META_PATH, "utf8"));
  const fullMsg = process.env.COMMIT_MSG || "";

  // 1. Calculate SemVer (major.minor.patch)
  const currentVersion = meta.version || "0.0.0";
  const newVersion = calculateNewVersion(currentVersion, fullMsg);

  // 2. Parse release notes (omitting dev messages)
  const { userReleaseNotes } = parseCommitMessage(fullMsg);

  // 3. Construct clean entry
  const newEntry = {
    version: newVersion,
    userNotes: userReleaseNotes,
    timestamp: new Date().toISOString()
  };

  // 4. Update JSON data
  meta.version = newVersion;
  if (!meta.history) meta.history = [];
  meta.history.unshift(newEntry);
  if (meta.history.length > 50) meta.history = meta.history.slice(0, 50);
  meta.latest = newEntry;

  // 5. Save file
  fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2));
  console.log(`Successfully updated version to v${newVersion}`);
}

updateVersion();