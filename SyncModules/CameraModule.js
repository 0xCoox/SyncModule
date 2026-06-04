import ModuleCore from "./Core/ModuleCore.js";
import TransformModule from "./TransformModule.js";


export default class CameraModule extends TransformModule {
	static type = "CameraModule";
	static commands = {
		...super.commands,
		updateCamera: "UPDATE_CAMERA",
	};

	#fov = 50;
	#aspect = 4/3;
	#near = 0.1;
	#far = 1;

	constructor ( UUID ) {
		console.log( `CameraModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.updateCamera, 
			( { camera } ) => this.updateCamera( camera )
		);
	}

	get camera ( ) {
		return {
			fov: this.#fov,
			aspect: this.#aspect,
			near: this.#near,
			far: this.#far,
		}
	}

	updateCamera ( camera, sync = false ) {
		console.log( `CameraModule - updateCamera` );

		const { fov, aspect, near, far } = camera;
		if ( fov ) this.#fov = fov;
		if ( aspect ) this.#aspect = aspect;
		if ( near ) this.#near = near;
		if ( far ) this.#far = far;

		this.onChange( this.commands.updateCamera, this.camera );

		if ( sync ) {
			this.output( this.commands.updateCamera, { camera: this.camera } );
		}
	}

	getState ( ) {
		return {
			...super.getState( ),
			camera: this.camera
		};
	}

	setState ( state ) {
		super.setState( state );
		this.updateCamera( state.camera );
	}
}