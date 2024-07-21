import { ComponentResource, ComponentResourceOptions, Input, interpolate, Output } from '@pulumi/pulumi';
import { remote, local, types } from '@pulumi/command';
import { Platform } from '../functions.js';
import { getPlatform } from '../utils.js';

export interface UbiInstallerArgs {
    connection?: types.input.remote.ConnectionArgs
    platform: Platform

    sudoPassword?: Input<string>
}

export class UbiInstaller extends ComponentResource {
    #remote?: remote.Command
    #local?: local.Command
    #platform: Output<Platform>

    constructor(name: string, args?: UbiInstallerArgs, opts?: ComponentResourceOptions) {
        args ??= { platform: getPlatform() };
        super('iac:os:UbiInstaller', name, {}, opts);

        this.#platform = Output.create(args.platform);

        const isWindows = args.platform === 'windows';
        let url = "https://raw.githubusercontent.com/houseabsolute/ubi/master/bootstrap/bootstrap-ubi.sh" 
        let cmd = `curl --silent --location '${url}' | sh`;
        let sudoCmd = args.sudoPassword ? interpolate`echo ${args.sudoPassword} | sudo -S` : Output.create(`sudo`);
        if (isWindows) {
            const url = "https://raw.githubusercontent.com/houseabsolute/ubi/master/bootstrap/bootstrap-ubi.ps1";
            cmd = `powershell -exec bypass -c "Invoke-WebRequest -URI '${url}' -UseBasicParsing | Invoke-Expression`;
        } else {
            cmd = interpolate`${sudoCmd} curl --silent --location '${url}' | sh`;
        }

        if (args.connection) {
            this.#remote = new remote.Command(name, {
                connection: args.connection,
                create: cmd,
                update: 'ubi --self-upgrade',
            });
        } else {
            this.#local = new local.Command(name, {
                create: cmd,
                update: 'ubi --self-upgrade',
            });
        }
    }

    get stdout(): Output<string> {
        return this.#local ? this.#local.stdout : this.#remote!.stdout;
    }

    get stderr(): Output<string> {
        return this.#local ? this.#local.stderr : this.#remote!.stderr;
    }

    get id(): Output<string> {
        return this.#local ? this.#local.id : this.#remote!.id;
    }

    get triggers(): Output<any> {
        return this.#local ? this.#local.triggers : this.#remote!.triggers;
    }

    get stdin(): Output<string | undefined> {
        return this.#local ? this.#local.stdin : this.#remote!.stdin;
    }

    get update(): Output<string | undefined> {
        return this.#local ? this.#local.update : this.#remote!.update;
    }

    get platform(): Output<Platform> {
        return this.#platform;
    }
}