# Project Scope — Ohouse_3D_Asset_Library

This folder is the **Ohouse_3D_Asset_Library** project.
- GitHub: `https://github.com/noyahjung/Ohouse_3D_Asset_Library`
- Dev server port convention: **8765**
- Visual marker: green badge `OHOUSE · ASSET LIBRARY`, green favicon
- Entry: `3Dassetlibrary.html` (current main); legacy entry `material-test.html` still present

## Sibling project (DO NOT MIX)
A separate project lives at `/Users/noyahjung/Desktop/desktop.nosync/3d_graphic_customize_test` with its own git remote (`3d_graphic_customize_test`). Never copy, reference, edit, or commit files across the two projects without explicit instruction from the user.

## Asset addition auto-flow (no separate command needed)
When the user says any variant of "에셋을 추가했어" / "added a new asset" with a `*.gltf` or `*.glb` in the repo root, run the full pipeline in [docs/project-guide.md §4](docs/project-guide.md) without asking for individual confirmations:
1. **§4-2 file optimization** — `npx -y -p gltfpack@0.20 gltfpack -i <원본>.gltf -o <id>.glb -kn -km` (note: `-kn` is mandatory; without it node names get stripped to `?` and `materialFor` matching breaks). Verify 50–80% size reduction, delete the original `.gltf`/`.bin`.
2. **§4-3 registry entry** — include `weldVertices: true` by default (or `keepOriginalNormals: true` if the asset has hand-tuned normals like basket/clock). One of the two must be present. `materialFor(name, parentName)` must check **both** arguments — gltfpack wraps the original named Mesh in an unnamed Group, so the recognizable name lands on `parentName` while `name` is blank.
3. **§4-4 chip button** — add `<button class="asset-chip" data-asset="<id>">…</button>`.
Do NOT enable gltfpack's `-cc` (meshopt compression); the loader has no `MeshoptDecoder` wired up.

## Commit/push guard
Before any `git commit` or `git push` in this folder, print `pwd`, `git remote -v`, and `git branch --show-current` so the user can confirm we're operating on the correct repo.

## S3 deploy guard
Deploy target: `s3://bucketplace-data-static/prod/branddesign/3Dassetlibrary/` (AWS account `534193482673`, Athena-Mgmt SSO). Live URL: `https://static-contents.datapl.datahou.se/v2/branddesign/3Dassetlibrary/3Dassetlibrary.html`.

Before any `aws s3 cp/sync/rm` against `bucketplace-data-static`, print `pwd` and `aws sts get-caller-identity`, and run the command with `--dryrun` first so the user can confirm the object list. Full procedure and the exact include-pattern sync command live in [docs/project-guide.md §5](docs/project-guide.md). Never target the `branddesign/` root directly — always keep the `3Dassetlibrary/` prefix so assets don't bleed into sibling projects.
