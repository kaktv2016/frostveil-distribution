# Frostveil distribution

Official distribution source and offline preparation tooling for Frostveil Skyrim Multiplayer RP. **No public Modpack Release is authorized or published. No production signing identity is configured. Actual Skyrim installation is disabled.**

The launcher self-updater uses a different repository and Windows signing policy. This repository contains audited source only; no game files, runtime/native binaries, private keys, tokens, player data or Modpack binary payloads belong in Git. Future separately approved payloads use GitHub Release Assets.

## Local verification

Node 24.11.1 and pinned npm lockfile: `npm ci`, `npm run typecheck`, `npm run build`, `npm test`, `npm run audit`. Shared V1 validator/verifier/preparation source is copied with canonical LF line endings from the audited launcher snapshot, recorded by source-snapshot.json; it is not a separately designed parser or installer. Resynchronize only through reviewed exact source snapshots. No transactional engine is copied.

`npm run prepare:synthetic -- 1.0.1` creates original direct-file text assets, canonical exact signed V1 bytes, ephemeral **test-only** public identity, and an audit summary under ignored .artifacts/. The private key stays in process memory. Nothing is uploaded. `npm run verify -- .artifacts/synthetic` independently checks the existing envelope and every declared payload. Test/public keys cannot become production trust by release upload.

## Offline production preparation — blocked pending approval

`npm run prepare -- --definition <JSON> --sources <directory> --key <outside-repo-PEM> --approval <outside-repo-reviewed-JSON> --output <outside-repo-directory>` requires all flags, explicit reviewed production identity and exact package source mapping. Definition fields: manifest, server, files (assetName to relative source file), release (fixed-repository GitHub metadata including assigned asset IDs). Approval fields: authorized=true, approvedBy, source with mode=production, packId, channel, keys (publicKey/environment/revoked), permittedReviews. Never paste a token/private key into source, logs, issues or CI. Secure offline private key access is the operator responsibility; no production key is generated or selected automatically.

Run independently verified source hashes and rights checks before signing. Prepare only legally authorized assets. Ed25519 authenticates approved publisher bytes; SHA256 verifies payload integrity. GitHub HTTPS alone is not publisher trust. No ZIP, scripts/FOMOD/hooks or arbitrary manifest download URLs.

## Publication gates

Source publication was authorized separately. Release/tag/assets and production identity publication require explicit owner approval, reviewed content/keys, configured GitHub protected environment approval, and verified version/immutability status. Workflows currently have contents:read only and no release/tag/upload operation, signing secrets or publicly downloadable payload artifacts. Manual workflow prepares ephemeral test outputs on its disposable runner and reports diagnostics only. Add production publication only after separate review; never bypass the gate.

Local loopback/installer acceptance belongs to the launcher tests. Anonymous real GitHub asset acceptance is BLOCKED until a separately approved harmless synthetic Release is published and authenticated. See licenses/CONTENT_POLICY.md and compatibility/TRUST_POLICY.md.
