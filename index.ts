export const parseSemver = (version: string) : [number, number, number, number] => { 

    let versionString = version;
    let beta = 0; 

    if(versionString.substring(0, 1) === 'v') { 
        versionString = versionString.substring(1); 
    }

    // Beta 
    if(version.includes("-")) { 
        
        const parts = version.split("-"); 
        
        if(parts[1].substring(0, 5) === 'beta.') { 
            const betaParts = parts[1].split('.')
            beta = parseInt(betaParts[1])
        }

        versionString = parts[0]
    }

    // Not a properly formatted version string
    if(versionString.indexOf('.') === -1) { 
        return [0, 0, 0, 0]; 
    }

    const versionParts = versionString.split('.'); 

    // Not a properly formatted version string 
    if(versionParts.length < 2) { 
        return [0,0,0,0]; 
    }

    const major = parseInt(versionParts[0]);
    const minor = parseInt(versionParts[1]); 
    const patch = parseInt(versionParts[2]);  

    return [major, minor, patch, beta]; 
}


// 1 is v1 is greater than v1
// 0 is they are the same 
// -1 is v1 is less than v2
// 1.2.3-beta.1
export const compareSemver = (version1 : string, version2 : string) : number => { 

    const [v1Major, v1Minor, v1Patch, v1beta] = parseSemver(version1);
    const [v2Major, v2Minor, v2Patch, v2beta] = parseSemver(version2);

    // Compare major 
    if(v1Major !== v2Major) { 
        if(v1Major > v2Major) { 
            return 1; 
        } else {
            return -1; 
        }
    }

    // Compare minor
    if(v1Minor !== v2Minor) { 
        if(v1Minor > v2Minor) { 
            return 1; 
        } else {
            return -1; 
        }
    }

    // Compare patch
    if(v1Patch !== v2Patch) { 
        if(v1Patch > v2Patch) { 
            return 1; 
        } else {
            return -1; 
        }
    }

    // Compare beta 
    if(v1beta !== v2beta) { 
        if(v1beta > v2beta) { 
            return 1; 
        } else {
            return -1; 
        }
    }

    return 0; 

}