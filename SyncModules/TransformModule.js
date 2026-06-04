import ModuleCore from "./Core/ModuleCore.js";

export default class TransformModule extends ModuleCore {
	static type = "TransformModule";
	static commands = {
		...super.commands,
		updateTransform: "UPDATE_TRANSFORM",
	};

	#translation = [ 0, 0, 0 ]; // vec3
	#rotation = [ 0, 0, 0, 1 ]; // quat
	#scale = [ 1, 1, 1 ]; // vec3

	constructor ( UUID ) {
		// console.log( `TransformModule - constructor` );

		super( UUID );
		
		this.setOnCommand( this.commands.updateTransform, 
			( { transform } ) => this.updateTransform( transform )
		);
	}

	updateTransform ( transform, sync = false ) {
		// console.log( `TransformModule - updateTransform` );

		const { translation, rotation, scale } = transform;
		if ( translation ) {
			this.#translation.forEach( ( _, i ) => this.#translation[ i ] = translation[ i ] || 0 );
		}
		if ( rotation ) {
			this.#rotation.forEach( ( _, i ) => this.#rotation[ i ] = rotation[ i ] || 0 );
		}
		if ( scale ) {
			this.#scale.forEach( ( _, i ) => this.#scale[ i ] = scale[ i ] || 1 );
		}

		this.onChange( this.commands.updateTransform, this.transform );

		if ( sync ) {
			this.output( this.commands.updateTransform, { transform: this.transform } );
		}
	}

	get transform ( ) {
		return {
			translation: [ ...this.#translation ],
			rotation: [ ...this.#rotation ],
			scale: [ ...this.#scale ],
		}
	}

	getState ( ) {
		return { transform: this.transform };
	}

	setState ( state ) {
		this.updateTransform( state.transform );
	}
}