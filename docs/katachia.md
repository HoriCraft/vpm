# Katachia beta listing

Katachia uses a separate beta listing so the existing TexSlim repository and its package discovery remain unchanged.

- Guide: https://horicraft.github.io/vpm/katachia/
- VPM: https://horicraft.github.io/vpm/katachia/index.json
- Public assets: `site/katachia/` (six files only)
- Package assets: GitHub prereleases in this repository, tagged `katachia-v<VERSION>`

The guide includes installation, trial tasks, optional hints and feedback instructions. Anyone can add the common VPM URL; Katachia requires a valid product key to use the tool. Product tester keys are delivered separately by the owner; never put actual keys, private invitation messages, signing material or development history in this repository.

The guide can read a key from the URL fragment supplied in a private message. It removes that fragment immediately and stores the key only in memory until the page is closed or reloaded. Fragments are not part of HTTP requests, but the complete link remains sensitive: anyone receiving it can copy that key. This does not provide identity verification or remote revocation. Unity validates the product key signature and expiry.

## Publishing a version

1. Prepare the immutable ZIP, version metadata and guide on a feature branch. Keep earlier package versions in the listing.
2. Run `node scripts/verify-katachia.mjs --package /path/to/ZIP` to verify the staged public files and the exact package size and SHA256.
3. After the owner's approval, publish the prerelease ZIP under the URL in `site/katachia/release.mjs`. Never overwrite an existing version's asset.
4. Run `node scripts/verify-katachia.mjs --remote` to verify the actual public download before publishing the listing.
5. Merge the reviewed page/listing change into main. The existing Pages workflow includes the static `katachia/` directory. Check the deployed guide, the beta listing and the unchanged TexSlim listing.
6. Confirm the installation and key-copy path in VCC/ALCOM and Unity before sending invitations.

The daily Pages build runs static validation only. It does not make the existing TexSlim listing depend on a successful separate Katachia download on every run. The release download check above is required when publishing or changing a package.

The first candidate is `0.2.0-beta.7`, 6,205,884 bytes, SHA256 `2f069c45b1fd70e7e76a1c7f61d80ac2f676570b4ad937859a639517536a629e`. Its guide changes do not rebuild the Unity package.

## 2026-09-16 beta.9

- The owner explicitly approved publishing beta.9 with the current known UI issues.
- Package source: `947c7732c56d34c123330c9b88dc1df4e218b770`; immutable package: 12,744,980 bytes, SHA256 `22274eb47b31e96d3ccc8de66204a844071c1b1c95128b77e9e810bdc94bac88`.
- Owner verified the same candidate update in Test Project, edition and earlier face/photo retention, and basic PNG/preview operations on Sio. GIF, arbitrary clips and a fresh install remain under review. Automated package checks are not Unity visual verification.
- Known issues are listed on the guide: capture settings scroll resets, angle drag ordering, automatic full-body framing on mesh changes, and avatar-dependent built-in appearance quality.
- The beta.7 listing entry, asset and repository identity remain unchanged. No signing-key rotation or free-edition policy change is included.

## 2026-09-16 beta.10

- Owner explicitly authorized implementation, regression checks and publication without another approval or waiting for owner interaction. No claim of Unity visual acceptance.
- Source ced5ce6174ae2ee6170380f0f1c95f711df6fc12; 12752761 bytes; SHA256 3786df647db1c64ea0d71e4dd7d9dff1e67f10c1ff1144732ac03a2e8fc999dd.
- Free edition ended; existing valid keys, data and .anim references remain. Bundled capture expression/pose presets retired.
- Same repository identity and previous versions remain. Only new Photos~/Reports~ output locations; no old-file migration.
- Remaining Unity checks are documented on the public guide and release notes.

## 2026-09-17 beta.11

- Owner explicitly authorized G0-G7 implementation, the HoriCraft/vpm main fast-forward, new tag/prerelease and public download verification. Unity was not launched.
- Source 13751805d29b24d83e54599b471bd11f657a63c0; 12759159 bytes; SHA256 4c88fe6fc8d84d93a58c9460b25490a55ee73a2b057b8270d146058d016443e8.
- Three-purpose header, recent five saves, compact comparison sources and one primary photo action. Background, GIF, startup and wording fixes from the preceding batch are included.
- All previous listing entries and repository IDs/URLs remain identical. Existing keys, Runtime schema, SavedPhotos capture path and ExpressionWorkspace remain unchanged.
- Automated checks include the extracted release ZIP in four compile configurations. Native Unity layout, NDMF rendering, fresh installation and update retention remain for tester verification.

## 2026-09-18 beta.12

Owner explicitly authorized implementation and publication. Source 3b52ebd6babe6c3ec932ebfb7be2d3545f1e8f2a; 12765297 bytes; SHA256 51a765d769e93c98d594028540f57e329f1f8d22d49480463433aa7366799122. Face/history/copy, photography controls and expression guidance improved. Native Unity validation remains pending. Existing entries/IDs/keys and Runtime schema preserved.

## 2026-09-18 beta.13

Owner explicitly authorized implementation/publication and a public beta12 reference. Source b48061f2db21468b1b55a29e18f82fd26df258e1; 12776129 bytes; SHA256 348b8f86f1a2c0b422e0a0565cff5d0e0bac636e7099f48b900d03cfe423ae9f. Purpose-based transfers, capture failure handling, persisted settings and UI clarity. Native Unity validation pending. Old entries, IDs, meta, keys and Runtime schema preserved.

[beta12 review reference](katachia/beta12-review.md)

## Public beta.13 review reference

The owner requested a beta.13 reference readable from ChatGPT, following the beta.12 reference. [beta13 review](katachia/beta13-review.md) and its [frozen changelog](katachia/beta13-changelog.md) describe the shipped source, all 29 feedback dispositions, automatic validation and remaining Unity checks. [Mobile HTML](https://horicraft.github.io/vpm/katachia/review/beta13.html) is static and requires no login or JavaScript. Beta.12 documents remain unchanged. This documentation update does not alter the package, VPM listing, release tag, keys or product repository visibility.

## 2026-09-18 beta.14

Owner authorized implementation and publication. UI history consistency and shape editing; Unity validation pending. Source 87d138b592e6252a82ff0d044ec11207c2896c76. 12792337 bytes, SHA256 8eddcde76115039c9609911869690ec497a48606bf250fd0aa36c4d6234de2e1. Existing version entries, meta GUIDs, keys and Runtime schema preserved. [Review](katachia/beta14-review.md).

## 2026-09-19 beta.15

Owner requested implementation and publication of the save-button relocation, expression flow and distributed-prefab comparison. Source 8355692f4555f8c04e468fdc3bfe86cb96a0d250. 12811123 bytes, SHA256 2d8dd8b617a07023813315c8f7ba70ca0bc37688cc64e8b5f4b938cbc67df389. Existing version entries, meta GUIDs, keys and Runtime schema preserved. Unity validation status is recorded in the product repository. [Review](katachia/beta15-review.md).
