import { ComponentResource, ComponentResourceOptions, Input, interpolate, Output, } from '@pulumi/pulumi'
import { local, remote, types } from '@pulumi/command'

export interface AptPackageArgs {

    name: Input<string>,

    version?: Input<string>,

    environment?: Input<{
        [key: string]: Input<string>;
    }>

    connection?: types.input.remote.ConnectionArgs

    sudoPassword?: Input<string>

    autoRemove?: Input<boolean>

    purge?: Input<boolean>
}

export class AptPackage extends ComponentResource {
    #local?: local.Command
    #remote?: remote.Command
    #package: Output<string>
    #version: Output<string | undefined>

    constructor(name: string, args: AptPackageArgs, opts?: ComponentResourceOptions) {
        super('iac:apt:AptPackage', name, args, opts)
        const { version, connection, environment } = args;
        let packageName = args.name;

        this.#package = Output.create(packageName);
        this.#version = Output.create(version);

        if (version) {
            packageName = interpolate`${packageName}=${version}`;
        }

        const sudoCmd = args.sudoPassword ? interpolate`echo ${args.sudoPassword} | sudo -S` : Output.create(`sudo`);
        
        if (args.connection) {
            this.#remote = new remote.Command(name, {
                connection: args.connection,
                create: sudoCmd.apply(s => interpolate`${s} apt-get install -y ${packageName}`),
                update: sudoCmd.apply(s => interpolate`${s} apt-get install -y ${packageName} --only-upgrade`),
                delete: sudoCmd.apply(s =>  {
                    let r : Output<string>;
                    if (args.purge) {
                        r = interpolate`${s} apt-get purge -y ${packageName}`;
                    } else {
                        r = interpolate`${s} apt-get remove -y ${packageName}`;
                    }

                    if (args.autoRemove) {
                        r = r.apply(r => interpolate`${r} && ${s} apt-get autoremove -y`);
                    }

                    return r;
                }),
                environment: args.environment,
            });
        } else {
            this.#local = new local.Command(name, {
                create: sudoCmd.apply(s => interpolate`${s} apt-get install -y ${packageName}`),
                update: sudoCmd.apply(s => interpolate`${s} apt-get install -y ${packageName} --only-upgrade`),
                delete: sudoCmd.apply(s =>  {
                    let r : Output<string>;
                    if (args.purge) {
                        r = interpolate`${s} apt-get purge -y ${packageName}`;
                    } else {
                        r = interpolate`${s} apt-get remove -y ${packageName}`;
                    }

                    if (args.autoRemove) {
                        r = r.apply(r => interpolate`${r} && ${s} apt-get autoremove -y`);
                    }

                    return r;
                }),
                environment: args.environment,
            });
        }
    }

    get stdout() : Output<string> {
        return this.#local ? this.#local.stdout : this.#remote!.stdout
    }

    get stderr() : Output<string> {
        return this.#local ? this.#local.stderr : this.#remote!.stderr
    }

    get id() :  Output<string> {
        return this.#local ? this.#local.id : this.#remote!.id
    }

    get triggers() :  Output<any> {
        return this.#local ? this.#local.triggers : this.#remote!.triggers
    }

    get stdin() :  Output<string | undefined>  {
        return this.#local ? this.#local.stdin : this.#remote!.stdin
    }

    get update() : Output<string | undefined> {
        return this.#local ? this.#local.update : this.#remote!.update
    }

    get package() : Output<string> {
        return this.#package;
    }

    get version() : Output<string | undefined> {
        return this.#version;
    }
}