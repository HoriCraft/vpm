# MeshEraser public installation test

- Guide: https://horicraft.github.io/vpm/mesheraser-test/
- VPM repository: https://horicraft.github.io/vpm/mesheraser-test/index.json
- Package: `com.horicraft.mesh-eraser`, `1.1.0-beta.4`
- GitHub prerelease: `mesheraser-v1.1.0-beta.4`

This is a separate opt-in test repository. It does not add MeshEraser to the stable HoriCraft listing or change the existing TexSlim/Katachia routes. Do not add HoriCraft/vpm to sources.json: its releases contain multiple products.

Use a test avatar project without an old Assets installation. Enable **Show Pre-Release Packages** in VCC Settings → Packages. NDMF is required; register https://vpm.nadena.dev/ if the dependency cannot be resolved. Modular Avatar is also needed for menu toggles.

The package contains the common trial/purchased implementation, without an unlock key. Buyers retain their private key document. Legacy product-file authentication and migration of an Assets installation are separate operations. Never publish buyer documents, unlock keys, development helpers or private project data in this repository or its releases.

Beta.4 is based on the exact published beta.3 archive. It makes Step 2 compact at the existing minimum window size (420 x 520), changes H/C hints to show/hide in four languages, and vertically centers the labels, OFF controls, swatches, picker and shortcut captions. Step 1 keeps its scroll view. All existing controls and their action handlers remain available. Five existing Editor C# files are changed, one Editor layout file and its new metadata are added, and package.json changes only the version. The remaining 94 files, Runtime, build/license code, painted-data definitions and existing GUIDs are unchanged.

Archive: 378272 bytes, SHA256 `520f6bc977521995938de60ec2a394094096149fc41ba1aec629d93d46e5c64f`. All 102 files match the reviewed candidate. The original logo bytes are embedded without modification. Version assets are immutable; future package changes require a new prerelease number. The test package excludes the unfinalized terms draft, CHANGELOG and obsolete setup/migration guides under the existing tester-distribution policy.

Compile checks in three dependency profiles, 9,216 production layout calculations and 128 HTML model cases passed. The HTML model is not a Unity screenshot or native acceptance. Actual Unity fit at 420 x 520, picker rendering, H/C controls, paint/settings/reference retention and regression checks remain pending owner testing.

Beta.1 and beta.3 remain available with their original entries, bytes and checksums. Existing Public Test users can refresh the same repository and select beta.4; no localhost repository or new registration is needed. Save and close Unity before updating. The owner previously installed beta.3 through ALCOM; all 100 installed files matched its published archive.

Beta.3 changed Scene selection in Step 1 to read mesh geometry rather than calling Unity native Scene picking. Its three compile profiles and 8,016 production geometry checks passed. Native assertion recurrence, selection accuracy, performance and actual downgrade remain unverified.

## Verification and publication

1. Run `node scripts/verify-katachia.mjs` and `node scripts/verify-mesheraser-test.mjs --package /path/to/ZIP`.
2. With owner authorization, publish only the ZIP and its checksum as a prerelease, not latest.
3. Run `node scripts/verify-mesheraser-test.mjs --remote` before publishing the page/listing.
4. Publish the reviewed change to main and verify Pages deployment, both new URLs, the actual download hash and preservation of existing listings.

File, archive and web checks are not Unity acceptance. Actual VCC/ALCOM installation, Unity compilation/deserialization, legacy painted-data retention and rollback remain unverified in this public route. Automatic legacy migration is not included, and adding over an old Assets installation is not blocked by the package itself.
