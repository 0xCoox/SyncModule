import ModuleCore from "./Core/ModuleCore.js";

export default class TextModule extends ModuleCore {
	static type = "TextModule";
	static commands = {
		...super.commands,
		updateText: "UPDATE_TEXT",
	}

	#text = "";

	constructor ( UUID ) {
		console.log( `TextModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.updateText,
			( { text } ) => this.updateText( text )
		);
	}

	updateText ( text, sync = false ) {
		console.log( `TextModule - updateText` );
		console.log( text );
		this.#text = text

		this.onChange( this.commands.updateText, this.text );

		if ( sync ) {
			this.output( this.commands.updateText, { text: this.text } );
		}
	}

	get text ( ) {
		return this.#text;
	}

	getState ( ) {
		return { text: this.text };
	}

	setState ( state ) {
		this.updateText( state.text );
	}
}