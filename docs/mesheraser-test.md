# MeshEraser public installation test

- Guide: https://horicraft.github.io/vpm/mesheraser-test/
- VPM repository: https://horicraft.github.io/vpm/mesheraser-test/index.json
- Package: `com.horicraft.mesh-eraser`, `1.1.0-beta.3`
- GitHub prerelease: `mesheraser-v1.1.0-beta.3`

This is a separate opt-in test repository. It does not add MeshEraser to the stable HoriCraft listing or change the existing TexSlim/Katachia routes. Do not add HoriCraft/vpm to sources.json: its releases contain multiple products.

Use a test avatar project without an old Assets installation. Enable **Show Pre-Release Packages** in VCC Settings → Packages. NDMF is required; register https://vpm.nadena.dev/ if the dependency cannot be resolved. Modular Avatar is also needed for menu toggles.

The package contains the common trial/purchased implementation, without an unlock key. Buyers retain their private key document. Legacy product-file authentication and migration of an Assets installation are separate operations. Never publish buyer documents, unlock keys, development helpers or private project data in this repository or its releases.

Beta.3 changes two existing Editor C# files and adds one selection helper with a new GUID, based on the published beta.1 archive. The package version is updated; 95 existing files, including Runtime, build/license code, paint data definitions and existing GUIDs, are unchanged. Step 1 reads mesh geometry rather than calling Unity native Scene picking. This is an assertion-avoidance candidate, not a confirmed native Unity fix. The original logo bytes are embedded without modification. The test package excludes the unfinalized terms draft, CHANGELOG and obsolete setup/migration guides under the existing tester-distribution policy.

Archive: 376937 bytes, SHA256 `7943c15f4e82c3f255ff625e6471fb11d65f34a87582471ef6174ac753aff61c`. Version assets are immutable; future package changes require a new prerelease number.

Beta.1 remains available with its original bytes and checksum. Existing Public Test users can refresh the same repository and select beta.3; no localhost repository is needed. Compile checks in three dependency profiles and 8,016 production geometry calculations passed. Native Scene assertions, selection position, paint/settings/reference retention, performance and actual downgrade remain pending owner testing.

## Verification and publication

1. Run `node scripts/verify-katachia.mjs` and `node scripts/verify-mesheraser-test.mjs --package /path/to/ZIP`.
2. With owner authorization, publish only the ZIP and its checksum as a prerelease, not latest.
3. Run `node scripts/verify-mesheraser-test.mjs --remote` before publishing the page/listing.
4. Publish the reviewed change to main and verify Pages deployment, both new URLs, the actual download hash and preservation of existing listings.

File, archive and web checks are not Unity acceptance. Actual VCC/ALCOM installation, Unity compilation/deserialization, legacy painted-data retention and rollback remain unverified in this public route. Automatic legacy migration is not included, and adding over an old Assets installation is not blocked by the package itself.
