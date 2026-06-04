import FileModule from "./FileModule.js";

export default class GLTFModule extends FileModule {
	static type = "GLTFModule";
	static commands = {
		...super.commands,
		/// TODO
	};

	#sceneGraph;

	constructor ( UUID ) {
		console.log( `GLTFModule - constructor` );

		super( UUID );

	}
}