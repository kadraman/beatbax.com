---
sidebar_position: 4
title: Verify downloads
---

If required, you can verify Desktop installer downloads with `SHA256SUMS` on [GitHub Releases](https://github.com/kadraman/beatbax/releases). Each Desktop release (tags `desktop-v*`) ships a `SHA256SUMS` file listing the SHA-256 digest of every installer asset.

> This does **not** apply to [itch.io](https://kadraman.itch.io/beatbax) downloads — itch.io does not publish `SHA256SUMS`, and those files are not covered by the GitHub checksums below.


## Checksums

1. Download the installer for your platform **and** `SHA256SUMS` from the same release.
2. Put both files in the same folder.
3. Check the digest:

**Linux** (GNU `sha256sum`):

```bash
sha256sum -c SHA256SUMS --ignore-missing
```

**macOS** (`shasum` has no `--ignore-missing`) — verify only the installer you downloaded, for example:

```bash
grep 'BeatBax-.*\.dmg$' SHA256SUMS | shasum -a 256 -c -
```

Or hash the file and compare the digest to the matching line in `SHA256SUMS`:

```bash
shasum -a 256 BeatBax-<version>.dmg
```

**Windows** (PowerShell):

```powershell
Get-Content .\SHA256SUMS | ForEach-Object {
  if ($_ -match '^([0-9a-fA-F]+)\s+(.+)$') {
    $expected = $Matches[1].ToLowerInvariant()
    $name = $Matches[2].Trim()
    if (Test-Path $name) {
      $actual = (Get-FileHash -Algorithm SHA256 -Path $name).Hash.ToLowerInvariant()
      if ($actual -eq $expected) { "${name}: OK" } else { "${name}: FAILED" }
    }
  }
}
```

A matching file prints `OK`. If digests differ, re-download before installing.

## itch.io downloads

itch.io does not publish `SHA256SUMS`, and the GitHub checksums do not apply to itch.io downloads. Verify GitHub Release assets only.

## Optional GPG

When published on the same release, `SHA256SUMS.asc` and `beatbax-release.asc` can authenticate the checksum file itself:

```bash
gpg --import beatbax-release.asc
gpg --verify SHA256SUMS.asc SHA256SUMS
```

Then run the checksum steps above.

## Related docs

- [Installation](/docs/getting-started/installation)
- [BeatBax Desktop](/docs/tools/desktop)
