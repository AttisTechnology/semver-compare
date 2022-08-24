
import { parseSemver, VersionType } from '../index'

const cases = [
    ['1.2.3', 1, 2, 3, VersionType.Main, 0],
    ['1.2.3-', 0, 0, 0, VersionType.Main, 0],
    ['1.2.3-beta', 0, 0, 0, VersionType.Main, 0],
    ['1.2.3-beta.', 0, 0, 0, VersionType.Main, 0],
    ['1.2.3-beta.4', 1, 2, 3, VersionType.Beta, 4],
    ['1.2.3-alpha', 0, 0, 0, VersionType.Main, 0],
    ['1.2.3-alpha.', 0, 0, 0, VersionType.Main, 0],
    ['1.2.3-alpha.4', 1, 2, 3, VersionType.Alpha, 4],
    ['1.2.3-foo', 0, 0, 0, VersionType.Main, 0],
    ['1.2', 0, 0, 0, VersionType.Main, 0],
    ['v11.22.33', 11, 22, 33, VersionType.Main, 0], 
    ['v11.22.33-', 0, 0, 0, VersionType.Main, 0], 
    ['v11.22.33-beta', 0, 0, 0, VersionType.Main, 0], 
    ['v11.22.33-beta.1', 11, 22, 33, VersionType.Beta, 1], 
    ['v11.22.33-alpha.1', 11, 22, 33, VersionType.Alpha, 1], 
];

test.each(cases)("parseSemver(%s) should be %d,%d,%d,%d,%d", (semverString, major, minor, patch, versionType, beta) => { 
    expect(parseSemver(semverString as string)).toEqual([
        major, 
        minor, 
        patch, 
        versionType,
        beta
    ])
});
