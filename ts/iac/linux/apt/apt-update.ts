import { ComponentResource, ComponentResourceOptions, Input, interpolate, Output, } from '@pulumi/pulumi'
import { local, remote, types } from '@pulumi/command'

export interface AptUpdateArgs {
    environment?: Input<{
        [key: string]: Input<string>;
    }>

    connection?: types.input.remote.ConnectionArgs

    sudoPassword?: Input<string>

    upgrade?: Input<boolean>
}

export class AptUpdate extends ComponentResource {

    #remote?: remote.Command
    #local?: local.Command

    constructor(name: string, args: AptUpdateArgs, opts?: ComponentResourceOptions) {
        super('iac:apt:AptUpdate', name, args, opts)

        const sudoCmd = args.sudoPassword ? interpolate`echo ${args.sudoPassword} | sudo -S` : Output.create(`sudo`);
        const cmd = args.upgrade ? interpolate`${sudoCmd} apt-get update && apt-get upgrade -y` : interpolate`${sudoCmd} apt-get update`;

        if (args.connection) {
            this.#remote = new remote.Command(name, {
                connection: args.connection,
                create: cmd,
                update: cmd,
            })
        } else {
            this.#local = new local.Command(name, {
                create: cmd,
                update: cmd,
            })
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
}