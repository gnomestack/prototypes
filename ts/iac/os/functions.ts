import { readFile } from 'node:fs/promises';
import { release } from 'node:os';
import { spawnSync } from 'node:child_process';

export type Platform = "linux" | "windows" | "darwin" | 'freebsd' | 'openbsd' | 'netbsd' | 'sunos' | 'cygwin';
export type Arch = "amd64" | "386" | "arm" | "arm64" | "mips" | "mips64" | "mips64le" | "mipsle" | "ppc64" | "ppc64le" | "s390x";


export interface OsRelease {
    platform: Platform;
    arch: Arch;
    id: string;
    idLike?: string;
    name: string;
    version: string;
    versionCodename?: string;
    versionId?: string;
    prettyName?: string;
    versionIdLike?: string;
    buildId?: string;
    variant?: string;
    variantId?: string;
}

export async function getOsRelease(): Promise<OsRelease> {
    let platform: Platform = 'linux';
    switch(process.platform) {
        case 'win32':
            platform = 'windows';
            break;
        default:
            platform = process.platform as Platform;
            break;
    }
   
    let arch: Arch = process.arch as Arch;

    const osRelease: OsRelease = {
        platform,
        arch,
        id: '',
        name: '',
        version: '',
    };
    
    if (platform !== 'windows' && platform !== 'darwin') {
        const data = await readFile('/etc/os-release', { encoding: 'utf8'});
        const lines = data.split('\n');
        for(const line of lines) {
            let [key, value] = line.split('=');
            key = key.trim().toLowerCase();

            switch(key) {
                case 'id':
                    osRelease.id = value;
                    break;
                case 'id_like':
                    osRelease.idLike = value;
                    break;

                case 'name':
                    osRelease.name = value;
                    break;

                case 'version':
                    osRelease.version = value;
                    break;

                case 'version_codename':
                    osRelease.versionCodename = value;
                    break;

                case 'version_id':
                    osRelease.versionId = value;
                    break;

                case 'pretty_name':
                    osRelease.prettyName = value;
                    break;


                case 'version_id_like':
                    osRelease.versionIdLike = value;
                    break;


                case 'build_id':
                    osRelease.buildId = value;
                    break;

                case 'variant':
                    osRelease.variant = value;
                    break;

                case 'variant_id':
                    osRelease.variantId = value;
                    break;

                default:
                    continue;
            }
        }
    }

 
    if (platform === 'windows') {
        osRelease.id = 'windows';
        osRelease.name = 'Windows';
        const v = release();
        const versionMatch = /(\d+\.\d+)(?:\.(\d+))?/.exec(release());
        const version = versionMatch ? versionMatch[0] : '';

        const names = new Map([
            ['10.0.2', '11'], // It's unclear whether future Windows 11 versions will use this version scheme: https://github.com/sindresorhus/windows-release/pull/26/files#r744945281
            ['10.0', '10'],
            ['6.3', '8.1'],
            ['6.2', '8'],
            ['6.1', '7'],
            ['6.0', 'Vista'],
            ['5.2', 'Server 2003'],
            ['5.1', 'XP'],
            ['5.0', '2000'],
            ['4.90', 'ME'],
            ['4.10', '98'],
            ['4.03', '95'],
            ['4.00', '95'],
        ]);

        let year : string | undefined;

        if (['6.1', '6.2', '6.3', '10.0'].includes(version)) {
            let stdout : string;
            try {
                stdout =spawnSync('wmic', ['os', 'get', 'Caption'], { encoding: 'utf8' }).stdout || '';
            } catch {
                stdout = spawnSync('powershell', ['(Get-CimInstance -ClassName Win32_OperatingSystem).caption'], { encoding: 'utf8' }).stdout || '';
            }

            year = (stdout.match(/2008|2012|2016|2019|2022/) || [])[0];
        }

        if (year) {
            osRelease.variant = 'Server';
            osRelease.prettyName = `Windows Server ${year}`;
        }
        else {
            osRelease.variant = 'Desktop';
            osRelease.prettyName = `Windows ${names.get(version) || version}`;
        } 
          

        osRelease.version = v;
        osRelease.versionId = version;
    }

    if (platform === 'darwin') {
        osRelease.id = 'macos';
        osRelease.name = 'Mac OS';
        const version = Number((release()).split('.')[0]);
        const nameMap = new Map([
            [23, ['Sonoma', '14']],
            [22, ['Ventura', '13']],
            [21, ['Monterey', '12']],
            [20, ['Big Sur', '11']],
            [19, ['Catalina', '10.15']],
            [18, ['Mojave', '10.14']],
            [17, ['High Sierra', '10.13']],
            [16, ['Sierra', '10.12']],
            [15, ['El Capitan', '10.11']],
            [14, ['Yosemite', '10.10']],
            [13, ['Mavericks', '10.9']],
            [12, ['Mountain Lion', '10.8']],
            [11, ['Lion', '10.7']],
            [10, ['Snow Leopard', '10.6']],
            [9, ['Leopard', '10.5']],
            [8, ['Tiger', '10.4']],
            [7, ['Panther', '10.3']],
            [6, ['Jaguar', '10.2']],
            [5, ['Puma', '10.1']],
        ]);

        const [prettyName, versionId] = nameMap.get(version) || ['Unknown', 'Unknown'];

        osRelease.prettyName = prettyName;
        osRelease.versionId = versionId;
        osRelease.version = release();
    }

    return osRelease;
}