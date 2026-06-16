export const siteLinks = {
  itch: 'https://kadraman.itch.io/beatbax',
  github: 'https://github.com/kadraman/beatbax',
  releases: 'https://github.com/kadraman/beatbax/releases',
  webApp: 'https://app.beatbax.com',
  latestDesktopTag: 'desktop-v0.1.0',
  latestDesktopVersion: '0.1.0',
  siteRepo: 'https://github.com/kadraman/beatbax.com',
} as const;

export const desktopDownloads = {
  windows: {
    setup: `https://github.com/kadraman/beatbax/releases/download/${siteLinks.latestDesktopTag}/BeatBax-${siteLinks.latestDesktopVersion}-setup.exe`,
    portable: `https://github.com/kadraman/beatbax/releases/download/${siteLinks.latestDesktopTag}/BeatBax-${siteLinks.latestDesktopVersion}-win-x64.exe`,
  },
  mac: {
    dmg: `https://github.com/kadraman/beatbax/releases/download/${siteLinks.latestDesktopTag}/BeatBax-${siteLinks.latestDesktopVersion}.dmg`,
    arm64Zip: `https://github.com/kadraman/beatbax/releases/download/${siteLinks.latestDesktopTag}/BeatBax-${siteLinks.latestDesktopVersion}-mac-arm64.zip`,
  },
  linux: {
    deb: `https://github.com/kadraman/beatbax/releases/download/${siteLinks.latestDesktopTag}/BeatBax-${siteLinks.latestDesktopVersion}-linux-amd64.deb`,
    appImage: `https://github.com/kadraman/beatbax/releases/download/${siteLinks.latestDesktopTag}/BeatBax-${siteLinks.latestDesktopVersion}.AppImage`,
  },
} as const;
