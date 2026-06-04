import ModuleCore from "./Core/ModuleCore.js";

export default class ScalarModule extends ModuleCore {
	static type = "ScalarModule";
	static commands = {
		...super.commands,
		updateValue: "UPDATE_VALUE",
	};

	#value = 0;

	constructor ( UUID ) {
		console.log( `ScalarModule - constructor` );

		super( UUID );
		
		this.setOnCommand( this.commands.updateValue, 
			( { value } ) => this.updateValue( value )
		);
	}

	updateValue ( value, sync = false ) {
		console.log( `ScalarModule - updateValue` );

		this.#value = value;
		this.onChange( this.commands.updateValue, value );

		if ( sync ) {
			this.output( this.commands.updateValue, { value } );
		}
	} 

	get value ( ) {
		return this.#value;
	}

	getState ( ) {
		return { value: this.#value };
	}

	setState ( state ) {
		this.updateValue( state.value );
	}
}