
import { compareSemver, parseSemver } from '../index'

const cases = [
    ["0.0.0", "0.0.1", -1], 
    ["0.1.0-beta.1", "0.1.0-alpha.1", 1], 
    ["0.1.0-alpha.1", "0.1.0-beta.1", -1], 
    ["0.1.1", "0.1.2", -1], 
    ["0.1.2", "0.1.1", 1], 
    ["0.2.1", "0.3.1", -1], 
    ["0.3.1", "0.2.1", 1], 
    ["1.0.0", "2.0.0", -1], 
    ["2.0.0", "1.0.0", 1], 
];


test.each(cases)("compareSemver(%s, %s) should return %d", (v1, v2, result) => { 
    expect(compareSemver(v1 as string, v2 as string)).toBe(result); 
})

