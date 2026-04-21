# Project Scope — Ohouse_3D_Asset_Library

This folder is the **Ohouse_3D_Asset_Library** project.
- GitHub: `https://github.com/noyahjung/Ohouse_3D_Asset_Library`
- Dev server port convention: **8765**
- Visual marker: green badge `OHOUSE · ASSET LIBRARY`, green favicon
- Entry: `3Dassetlibrary.html` (current main); legacy entry `material-test.html` still present

## Sibling project (DO NOT MIX)
A separate project lives at `/Users/noyahjung/Desktop/desktop.nosync/3d_graphic_customize_test` with its own git remote (`3d_graphic_customize_test`). Never copy, reference, edit, or commit files across the two projects without explicit instruction from the user.

## Commit/push guard
Before any `git commit` or `git push` in this folder, print `pwd`, `git remote -v`, and `git branch --show-current` so the user can confirm we're operating on the correct repo.

## S3 deploy guard
Deploy target: `s3://bucketplace-data-static/prod/branddesign/3Dassetlibrary/` (AWS account `534193482673`, Athena-Mgmt SSO). Live URL: `https://static-contents.datapl.datahou.se/v2/branddesign/3Dassetlibrary/3Dassetlibrary.html`.

Before any `aws s3 cp/sync/rm` against `bucketplace-data-static`, print `pwd` and `aws sts get-caller-identity`, and run the command with `--dryrun` first so the user can confirm the object list. Full procedure and the exact include-pattern sync command live in [docs/project-guide.md §5](docs/project-guide.md). Never target the `branddesign/` root directly — always keep the `3Dassetlibrary/` prefix so assets don't bleed into sibling projects.
