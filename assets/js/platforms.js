function getDownloadLink(os) {

  var links = {
    'MacOS': 'https://www.banyanops.com/app/macos/latest',
    'Windows': 'https://www.banyanops.com/app/windows/latest',
    'Linux': 'https://www.banyanops.com/app/linux/latest-deb',
    'iOS': 'https://apps.apple.com/us/app/banyan-security/id1520459299',
    'Android': 'https://play.google.com/store/apps/details?id=com.banyanops.mobile',
    'Unknown': 'https://support.banyanops.com',
    // RPM distro - no way to detect!
    'Linux-RPM': 'https://www.banyanops.com/app/linux/latest-rpm',
    // Mac ARM - no way to detect!
    'MacOS-ARM': 'https://www.banyanops.com/app/macos/arm-latest',
    // Autodetect
    'Auto': '',
  }

  return links[os];
}

// https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js
function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = 'Unknown';

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'MacOS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}