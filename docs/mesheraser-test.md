# MeshEraser public installation test

- Guide: https://horicraft.github.io/vpm/mesheraser-test/
- VPM repository: https://horicraft.github.io/vpm/mesheraser-test/index.json
- Package: `com.horicraft.mesh-eraser`, `1.1.0-beta.6`
- GitHub prerelease: `mesheraser-v1.1.0-beta.6`

This is a separate opt-in test repository. It does not add MeshEraser to the stable HoriCraft listing or change the existing TexSlim/Katachia routes. Do not add HoriCraft/vpm to sources.json: its releases contain multiple products.

Use a test avatar project without an old Assets installation. Enable **Show Pre-Release Packages** in VCC Settings → Packages. NDMF is required; register https://vpm.nadena.dev/ if the dependency cannot be resolved. Modular Avatar is also needed for menu toggles.

The package contains the common trial/purchased implementation, without an unlock key. Buyers retain their private key document. Legacy product-file authentication and migration of an Assets installation are separate operations. Never publish buyer documents, unlock keys, development helpers or private project data in this repository or its releases.

Beta.6 is based on the exact published beta.5 archive. It removes the normal Inspector raw-data foldout, adds an isolated Undo transaction around generation and its Done caller, validates created/saved assets, and changes start-state editing to locate the unique named Bool. Missing, ambiguous or wrong-type parameters stop without changing another setting. Initial-state Component cache edits are in the same transaction as the MA edits.

Only MaSceneBackend.cs, MeshEraserComponentEditor.cs, MeshEraserWindow.Step3.cs, the fallback version in MeshEraserWindow.cs and package.json change. The other 97 files, all metadata/GUIDs, Runtime and license code are byte-identical to beta.5. Archive: 374442 bytes, SHA256 `0b579195bb1d443785a1bfc83f8c70dbe79cbb6ba81c9f5ff230fa7b4290ac5f`; all 102 files verified, no buyer key. The established test package omits unfinished terms, changelog and obsolete migration guides.

Three compile profiles and 25 regressions using extracted actual methods/caller with in-memory Undo/AssetDatabase/controller substitutes passed. Generation integration is checked statically. These are not native Unity tests. The owner will update through ALCOM and check Inspector, normal generation, parameter reordering, Undo/Redo and save/reload. A controlled failure test must use an independent copy; do not break a working project's files or fill the disk. New unreferenced files/empty folders may remain after failure; originals are not deleted. A rollback failure is surfaced rather than claimed successful.

Beta.5's new generated path remains `Assets/HoriCraft/MeshEraser/Generated/`, with old `MeshEraser_Generated/` references retained. Earlier beta.5 owner acceptance is historical evidence, not beta.6 acceptance. Beta.1/3/4/5 entries and downloads remain unchanged. Automatic UnityPackage migration is not included.

## Verification and publication

1. Run `node scripts/verify-katachia.mjs` and `node scripts/verify-mesheraser-test.mjs --package /path/to/ZIP`.
2. With owner authorization, publish only the ZIP and its checksum as a prerelease, not latest.
3. Run `node scripts/verify-mesheraser-test.mjs --remote` before publishing the page/listing.
4. Publish the reviewed change to main and verify Pages deployment, both new URLs, the actual download hash and preservation of existing listings.

File, archive and web checks are not Unity acceptance. Actual VCC/ALCOM installation, Unity compilation/deserialization, legacy painted-data retention and rollback remain unverified in this public route. Automatic legacy migration is not included, and adding over an old Assets installation is not blocked by the package itself.
