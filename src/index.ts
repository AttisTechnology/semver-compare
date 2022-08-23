// const regex = /(?<=^v?|\sv?)(?:(?:0|[1-9]\d{0,9}?)\.){2}(?:0|[1-9]\d{0,9})(?:-(?:--+)?(?:0|[1-9]\d*|\d*[a-z]+\d*)){0,100}(?=$| |\+|\.)(?:(?<=-\S+)(?:\.(?:--?|[\da-z-]*[a-z-]\d*|0|[1-9]\d*)){1,100}?)?(?!\.)(?:\+(?:[\da-z]\.?-?){1,100}?(?!\w))?(?!\+)/gi
// Tests: https://regex101.com/r/h4ke9G/1
const regex = /^(?:v)?[0-9]+\.[0-9]+\.[0-9]+(?:\-*(beta|alpha){0,1}\.[0-9]+)?$/
export const isValidSemver = (version : string) : boolean => { 
  return regex.test(version); 
}


export enum VersionType { 
  Alpha, 
  Beta, 
  Main, 
}

export const parseSemver = (version: string): [number, number, number, number, number] => {

  if(!isValidSemver(version)) { 
    return [0, 0, 0, VersionType.Main, 0]; 
  }

  let versionString = version;
  let beta = 0;

  // Remove the initial v
  if (versionString.substring(0, 1) === 'v') {
    versionString = versionString.substring(1);
  }

  let betaAlpha = VersionType.Main; 

  // Alpha/Beta
  if (version.includes('-')) {

    const parts = version.split('-');

    if (parts[1].substring(0, 6) === 'alpha.') {
      const betaParts = parts[1].split('.');
      beta = parseInt(betaParts[1], 10);
      betaAlpha = VersionType.Alpha;
    }

    if (parts[1].substring(0, 5) === 'beta.') {
      const betaParts = parts[1].split('.');
      beta = parseInt(betaParts[1], 10);
      betaAlpha = VersionType.Beta; 
    }

    versionString = parts[0];
  }

  const versionParts = versionString.split('.');

  const major = parseInt(versionParts[0], 10);
  const minor = parseInt(versionParts[1], 10);
  const patch = parseInt(versionParts[2], 10);

  return [major, minor, patch, betaAlpha, beta];
};

// 1 is v1 is greater than v1
// 0 is they are the same
// -1 is v1 is less than v2
// 1.2.3-beta.1
export const compareSemver = (version1: string, version2: string): number => {
  const [v1Major, v1Minor, v1Patch, v1AlphaOrBeta, v1beta] = parseSemver(version1);
  const [v2Major, v2Minor, v2Patch, v2AlphaOrBeta, v2beta] = parseSemver(version2);

  // Compare major
  if (v1Major !== v2Major) {
    if (v1Major > v2Major) {
      return 1;
    } else {
      return -1;
    }
  }

  // Compare minor
  if (v1Minor !== v2Minor) {
    return (v1Minor > v2Minor) ? 1 : -1; 
  }

  // Compare patch
  if (v1Patch !== v2Patch) {
    return (v1Patch > v2Patch) ? 1 : -1; 
  }

  // Compare is this an alpha or beta?
  if(v1AlphaOrBeta !== v2AlphaOrBeta) { 
    // Main > Beta > Alpha 
    return v1AlphaOrBeta > v2AlphaOrBeta ? 1 : -1; 
  }

  // Compare alpha/beta version
  if (v1beta !== v2beta) {
    return v1beta > v2beta ? 1 : -1; 
  }

  return 0;
};
