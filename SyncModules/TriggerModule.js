import ModuleCore from "./Core/ModuleCore.js";

export default class TriggerModule extends ModuleCore {
	static type = "TriggerModule";
	static commands = {
		...super.commands,
		trigger: "TRIGGER"
	}

	constructor ( UUID ) {
		console.log( `TriggerModule - constructor` );
		super( UUID );

		this.setOnCommand( this.commands.trigger,
			( ) => this.trigger( )
		);
	}

	trigger ( sync = false ) {
		this.onChange( this.commands.trigger, { } );

		if ( sync ) {
			this.output( this.commands.trigger, { } );
		}
	}
}