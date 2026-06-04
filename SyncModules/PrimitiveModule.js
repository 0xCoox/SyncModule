import ModuleCore from "./Core/ModuleCore.js";
import TransformModule from "./TransformModule.js";

export default class PrimitiveModule extends TransformModule {
	static type = "PrimitiveModule";
	static commands = {
		...super.commands,
		updatePrimitive: "UPDATE_PRIMITIVE",
	};

	#primitiveTypes = {
		Sphere: "Sphere",
		Box: "Box",
	};

	#primitive = this.#primitiveTypes.Sphere;

	constructor ( UUID ) {
		console.log( `PrimitiveModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.updatePrimitive,
			( { primitive } ) => this.updatePrimitive( primitive )
		);
	}

	get primitive ( ) {
		return this.#primitive;
	}

	get primitiveTypes ( ) {
		return { ...this.#primitiveTypes };
	}

	updatePrimitive ( primitive, sync = false ) {
		console.log( `PrimitiveModule - updatePrimitive` );

		this.#primitive = primitive; /// TODO: TYPE CHECK?

		this.onChange( this.commands.updatePrimitive, primitive );

		if ( sync ) {
			this.output( this.commands.updatePrimitive, { primitive: this.primitive } );
		}
	}

	getState ( ) {
		return {
			...super.getState( ),
			primitive: this.primitive,
		};
	}

	setState ( state ) {
		super.setState( state );
		this.updatePrimitive( state.primitive );
	}
}