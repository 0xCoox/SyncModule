import ModuleCore from "./Core/ModuleCore.js";

export default class TextLogModule extends ModuleCore {
	static type = "TextLogModule";
	static commands = {
		...super.commands,
		addText: "ADD_TEXT",
		removeText: "REMOVE_TEXT",
		updateText: "UPDATE_TEXT",
		clear: "CLEAR",
	}

	#id = crypto.randomUUID(); /// Individual ID, not synchronized
	#textLogs = new Map( ); /// textUUID -> textLog{ UUID, id, string }
	#textList = [ ]; /// ordered list of textUUIDs
	
	constructor ( UUID ) {
		console.log( `TextLogModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.addText, 
			( { textLog } ) => this.#addText( textLog )
		);
		this.setOnCommand( this.commands.removeText, 
			( { textLog } ) => this.removeText( textLog )
		);
		this.setOnCommand( this.commands.updateText, 
			( { textLog } ) => this.updateText( textLog )
		);
		this.setOnCommand( this.commands.clear, 
			( ) => this.clear( )
		);
	}

	get textLogs ( ) {
		return this.#textList.map( UUID => this.#textLogs.get( UUID ) );
	}

	getTextLog ( textUUID ) {
		return { ...this.#textLogs.get( textUUID ) };
	}

	/// public method for local adds
	addText( text, sync = false ) {
		const textLog = {
			UUID: crypto.randomUUID(),
			text: text,
			id: this.#id,
		};
		this.#addText( textLog, sync );
	}

	#addText ( textLog, sync = false ) {
		const { UUID, text, id } = textLog;

		this.#textList.push( UUID );
		this.#textLogs.set( UUID, { UUID, text, id } );

		this.onChange( this.commands.addText, this.getTextLog( UUID ) );

		if ( sync ) {
			this.output( this.commands.addText, { textLog: this.getTextLog( UUID ) } );
		}
	}

	removeText ( textLog, sync = false ) {
		const { UUID } = textLog;
		
		if ( !this.#textLogs.has( UUID ) ) {
			return;
		}

		this.#textList.filter( logUUID => logUUID != UUID );
		this.#textLogs.delete( UUID );

		this.onChange( this.commands.remove, { UUID } );

		if ( sync ) {
			this.output( this.commands.remove, { textLog: { UUID } } );
		}
	}

	updateText ( textLog, sync = false ) {
		const { UUID, text } = textLog;

		if ( !this.#textLogs.has( UUID ) ) {
			return;
		}

		this.#textLogs.get( )
		this.#textLogs.set( UUID, { UUID, text, id } );

		this.onChange( this.commands.updateText, this.getTextLog( UUID ) );

		if ( sync ) {
			this.output( this.commands.updateText, { textLog: this.getTextLog( UUID ) } );
		}
	}

	clear ( sync = false ) {
		this.#textLogs.clear( );
		this.#textList.length = 0;

		this.onChange( this.commands.clear, { } );
		if ( sync ) {
			this.output( this.commands.clear, { } );
		}
	}

	getState ( ) {
		const state = {
			textLogs: this.textLogs
		}
		return state;
	}

	setState ( state ) {
		for ( const textLog of state.textLogs ) {
			this.#addText( textLog );
		}
	}
}