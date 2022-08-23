import { isValidSemver } from "..";

const cases = [
    ["", false], 
    ["1", false],
    ["1.2", false],
    ["1.2.3", true],
    ["1.2.3-", false],
    ["1.2.3-alpha", false],
    ["1.2.3-beta", false],
    ["1.2.3-alpha.", false],
    ["1.2.3-beta.", false],
    ["1.2.3-foo", false],
    ["1.2.3-alpha.1234", true], 
    ["1.2.3-beta.1", true], 
    ["v1", false], 
    ["v1.1", false], 
    ["v1.2.3", true], 
    ["v1.2.3-", false], 
    ["v1.2.3-alpha", false], 
    ["v1.2.3-beta", false], 
    ["v1.2.3-alpha.", false], 
    ["v1.2.3-beta.", false], 
    ["v1.2.3-alpha.1", true], 
    ["v1.2.3-beta.1", true], 
]

test.each(cases)("isValidSemver(%s) should return %s", (version, isValid) => { 

    expect(isValidSemver(version as string)).toBe(isValid); 

}); 