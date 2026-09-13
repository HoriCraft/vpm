# Katachia beta listing

Katachia uses a separate beta listing so the existing TexSlim repository and its package discovery remain unchanged.

- Guide: https://horicraft.github.io/vpm/katachia/
- VPM: https://horicraft.github.io/vpm/katachia/index.json
- Public assets: `site/katachia/` (six files only)
- Package assets: GitHub prereleases in this repository, tagged `katachia-v<VERSION>`

The guide includes installation, trial tasks, optional hints and feedback instructions. Anyone can install the free edition from the common URL. Product tester keys are delivered separately by the owner; never put actual keys, private invitation messages, signing material or development history in this repository.

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
