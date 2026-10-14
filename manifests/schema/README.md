# Manifest V1

The exact shared validator is `src/main/modpack/schema.ts`; shared types are `src/shared/modpack-contracts.ts`. No separate parser or alternate V2. `compatibility/source-snapshot.json` records exact audited source hashes. Source push validation checks those hashes.

Existing names `channel`, `minimumLauncherVersion`, runtime/client/server bindings are retained. Optional `distribution.release` binds owner/repo/tag; eligible direct-file entries require `package` binding owner/repo/tag/assetId/assetName/size/sha256/componentId/packVersion and rights review. All are covered by the Ed25519 signed payload. Installed targets are independent of asset names. External/native/game/SKSE assets have no package acquisition eligibility.
