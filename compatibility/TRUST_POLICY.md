# Trust and release policy

Production pins are currently empty. Missing, test-only, unsupported or revoked publisher identities fail closed. Fixture keys are generated explicitly in memory for tests, never trusted for production. Production preparation requires a reviewed explicit key and approval record outside source/CI. No key generation or signing secret selection in normal CI. Rotate by an audited source update retaining stable key IDs and revoking retired pins; never replace remote pins implicitly.

Signed version/repository/channel/package ID/name/hash bindings authenticate direct assets. The launcher retains bounded trusted highest versions/hashes and refuses replay, downgrades and same-version content changes; local history is not proof against a hostile same-user process.

Use pack-v<semver>; stable has no prerelease, beta has explicit prerelease. Before later approved publication, inspect immutable-releases configuration and release immutable flag, prepare all assets in a restricted draft, verify IDs/hash/signature, then obtain separate human approval. Initial API state was enabled=false, enforced_by_owner=false (2026-10-15). No immutability claim.

The current V1 offline server snapshot expires within seven days; refresh design and live server compatibility are L4-C prerequisites. L4-B cannot write actual Skyrim.
