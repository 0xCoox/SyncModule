import ModuleCore from "./Core/ModuleCore.js";

export default class LineModule extends ModuleCore {
	static type = "LineModule";
	static commands = {
		...super.commands,
		updateLine: "UPDATE_LINE",
		/// ORIGIN & END?
	};

	#origin = [ 0, 0, 0 ]; /// vec3
	#end = [ 0, 0, 0 ]; /// vec3

	constructor ( UUID ) {
		console.log( `LineModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.updateLine,
			( { line } ) => this.updateLine( line )
		);
	}

	updateLine ( line, sync = false ) {
		console.log( `LineModule - updateLine` );

		const { origin, end } = line;
		if ( origin ) {
			this.#origin.forEach( ( _, i ) => this.#origin[ i ] = origin[ i ] || 0 );
		}
		if ( end ) {
			this.#end.forEach( ( _, i ) => this.#end[ i ] = end[ i ] || 0 );
		}

		this.onChange( this.commands.updateLine, this.line );

		if ( sync ) {
			this.output( this.commands.updateLine, { line: this.line } );
		}
	}

	get line ( ) {
		return {
			origin: [ ...this.#origin ],
			end: [ ...this.#end ],
		}
	}

	getState ( ) {
		return { line: this.line };
	}

	setState ( state ) {
		this.updateLine( state.line );
	}
}