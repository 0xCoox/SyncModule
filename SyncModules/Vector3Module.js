import ModuleCore from "./Core/ModuleCore.js";

export default class Vector3Module extends ModuleCore {
	static type = "Vector3Module";
	static commands = {
		...super.commands,
		updateVector: "UPDATE_VECTOR",
	};

	#vector = [0, 0, 0];
	
	constructor ( UUID ) {
		console.log( `Vector3Module - constructor` );

		super( UUID );
		
		this.setOnCommand( this.commands.updateVector, 
			( { vector } ) => this.updateVector( vector )
		);
	}

	updateVector ( vector, sync = false ) {
		console.log( `Vector3Module - updateVector` );

		this.#vector.forEach( ( _, i ) => this.#vector[ i ] = vector[ i ] || 0 );
		this.onChange( this.commands.updateVector, this.vector );

		if ( sync ) {
			this.output( this.commands.updateVector, { vector: this.vector } );
		}
	}

	get vector ( ) {
		return [ ...this.#vector ];
	}

	getState ( ) {
		return { vector: this.vector };
	}

	setState ( state ) {
		this.updateVector( state.vector );
	}
}