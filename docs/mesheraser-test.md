# MeshEraser public installation test

- Guide: https://horicraft.github.io/vpm/mesheraser-test/
- VPM repository: https://horicraft.github.io/vpm/mesheraser-test/index.json
- Package: `com.horicraft.mesh-eraser`, `1.1.0-beta.5`
- GitHub prerelease: `mesheraser-v1.1.0-beta.5`

This is a separate opt-in test repository. It does not add MeshEraser to the stable HoriCraft listing or change the existing TexSlim/Katachia routes. Do not add HoriCraft/vpm to sources.json: its releases contain multiple products.

Use a test avatar project without an old Assets installation. Enable **Show Pre-Release Packages** in VCC Settings → Packages. NDMF is required; register https://vpm.nadena.dev/ if the dependency cannot be resolved. Modular Avatar is also needed for menu toggles.

The package contains the common trial/purchased implementation, without an unlock key. Buyers retain their private key document. Legacy product-file authentication and migration of an Assets installation are separate operations. Never publish buyer documents, unlock keys, development helpers or private project data in this repository or its releases.

Beta.5 is based on the exact published beta.4 archive. New toggle assets use `Assets/HoriCraft/MeshEraser/Generated/`; existing assets under `Assets/HoriCraft/MeshEraser_Generated/` are neither moved nor deleted. Normal reads retain serialized references. The hidden bake feature recognizes both roots. The folder creator makes missing parent folders and stops if the new root cannot be created.

Only MaSceneBackend.cs, BakeBackend.cs, the fallback version in MeshEraserWindow.cs and package.json change. The other 98 files, all metadata/GUIDs, Runtime, authentication, paint data and build passes are byte-identical to beta.4. Archive: 373536 bytes; SHA256 `9f11000285656c7b75fe6f607fa1d2317ff2c21cd49e8dd38c5098c416b7e6b6`. The unchanged 102-file tester package policy excludes unfinished terms, CHANGELOG and obsolete migration guides; no buyer key is present.

Three compile profiles passed. Eleven extracted-C# method checks use an in-memory AssetDatabase substitute. Five file-level migration/restore checks preserve new/old generated files and metadata; fixture-only project/process guards differ from production, and multi-version manifests remain harness-only. No Unity/ALCOM installation, save/reload, menu behavior or native migration has been tested for beta.5. The owner will update through ALCOM and perform native checks after publication. Never delete the entire legacy product folder: it can contain generated/user data. Automatic migration is not included.

Beta.1, beta.3 and beta.4 remain available with unchanged entries and downloads. Beta.4's earlier owner feedback covers H/C, paint/settings/references and Scene selection; it does not establish beta.5 acceptance. Existing users refresh the same Public Test repository; no new registration is needed.

## Verification and publication

1. Run `node scripts/verify-katachia.mjs` and `node scripts/verify-mesheraser-test.mjs --package /path/to/ZIP`.
2. With owner authorization, publish only the ZIP and its checksum as a prerelease, not latest.
3. Run `node scripts/verify-mesheraser-test.mjs --remote` before publishing the page/listing.
4. Publish the reviewed change to main and verify Pages deployment, both new URLs, the actual download hash and preservation of existing listings.

File, archive and web checks are not Unity acceptance. Actual VCC/ALCOM installation, Unity compilation/deserialization, legacy painted-data retention and rollback remain unverified in this public route. Automatic legacy migration is not included, and adding over an old Assets installation is not blocked by the package itself.
