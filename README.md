# Semver Compare 

Validate and compare two highly opinionated semantic version strings (aka not technically [Semantic Versioning](https://semver.org/)).  

For those of you looking for an actual semantic versioning project, I recommend a quick google search to find some other fine projects that will suit your needs. This project is primarily suited to meet the needs of attis tech. 


# Overview

This is a highly simplified format for versioning that does not allow for anything other than a simple `1.2.3` format with optional `-beta.[number]` or `-alpha.[number]` suffixes. 

See the regex in use: [https://regex101.com/r/EQl8V2/1](https://regex101.com/r/EQl8V2/1)


## Examples: 

| Version String | Valid | 
| --- | --- | 
|1.2.3|valid|
|v1.2.3|valid|
|v1.2.3+something|invalid|
|1.2.3-beta|invalid|
|1.2.3-beta.1|valid|
|1.2.3-alpha|invalid|
|1.2.3-alpha.1|valid|

See tests ([src/\_\_tests\_\_/isValidSemver.test.ts](src/__tests__/isValidSemver.test.ts)) for more examples.

## Comparison

While obviously `major` > `minor` > `patch`, it is also true that `main` > `beta` > `alpha`. 

| v1 | comparison | v2 |
| -- | :--: | -- |
| 1.2.3 | > | 1.2.2 |
| 1.2.3 | > | 1.1.2 | 
| 1.2.3-beta.1 | > | 1.2.3-alpha.1 | 
| 1.2.3-alpha.1 | > | 1.2.2 | 
| 1.2.3 | > | 1.2.3-alpha.1 | 


# Usage

```js
import { isValidSemver, parseSemver, compareSemver, VersionType } from '@attistech/semver-compare'; 

...

if(isValidSemver('1.2.3-beta.1')) { 
    // The version is valid
    ...
}

if(parseSemver('1.2.3-beta.1')[3] === VersionType.Beta) { 
    // The version is beta
    ...
}

if(compareSemver('1.2.3', '1.2.4') === -1) { 
    // The first version is less than the second version. 
    ...
}

```




# Testing

Test like the best. Test with [Jest](https://jestjs.io/)

```
$ jest
```

# License

Semver-Compare is [MIT Licensed](https://github.com/AttisTechnology/semver-compare/blob/main/LICENSE).