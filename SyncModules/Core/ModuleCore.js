export default class ModuleCore {
	static type = "ModuleCore";
	static commands = {
		setState: "SET_STATE",
	}

	#UUID;

	#outputFn;
	#commandCallbacks = new Map( ); /// command name -> callback function
	#changeCallbacks = new Map( );

	constructor ( UUID = crypto.randomUUID( ) ) {
		// console.log( `ModuleCore - constructor - ${ UUID }` );

		this.#UUID = UUID;

		this.setOnCommand( this.commands.setState, ( stateData ) => {
			this.setState( stateData );
		} );
	}

	get UUID ( ) {
		return this.#UUID;
	}

	get type ( ) {
		return this.constructor.type;
	}

	get commands ( ) {
		return Object.freeze( this.constructor.commands );
	}

	setOutputFn ( outputFn ) {
		this.#outputFn = outputFn;
	}

	input ( payload ) {
		const { command, data } = this.decode( payload );
		this.onCommand( command, data );
	}

	output ( command, data ) {
		const payload = this.encode( command, data );
		this.#outputFn?.( payload );
	}

	/// placeholders
	decode ( payload ) {
		/// data -> commandDataDecoder( command, data )
		return payload;
	}

	encode ( command, data ) {
		const payload = { moduleUUID: this.#UUID, command, data };
		/// data -> commandDataEncoder( command, data )
		return payload;
	}
	///

	setOnCommand ( command, callback ) {
		if ( !this.#commandCallbacks.has( command ) ) {
			this.#commandCallbacks.set( command, [ ] );
		}

		this.#commandCallbacks.get( command ).push( callback );
	}

	onCommand ( command, data ) {
		if ( this.#commandCallbacks.has( command ) ) {
			const callbacks = this.#commandCallbacks.get( command );
			callbacks.forEach( callback => callback( data ) );
		} else {
			console.warn( `${ this.type } - ${ this.#UUID }  - has no handler for ${ command }`);
		}
	}

	setOnChange ( change, callback ) {
		if ( !this.#changeCallbacks.has( change ) ) {
			this.#changeCallbacks.set( change, [ ] );
		}

		this.#changeCallbacks.get( change ).push( callback );
	}

	onChange ( change, data ) {
		if ( this.#changeCallbacks.has( change ) ) {
			const callbacks = this.#changeCallbacks.get( change );
			callbacks.forEach( callback => callback( data ) );
		}
	}

	/// overload in children
	getState ( ) {
		return { };
	}

	/// overload in children
	setState ( state ) {
		return;
	}

	outputState ( ) {
		const state = this.getState( );
		return this.encode( this.commands.setState, state );
	}

	delete ( ) {

	}
}