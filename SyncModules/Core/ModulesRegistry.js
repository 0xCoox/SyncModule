import ModuleCore from "./ModuleCore.js";
import ModuleTypes from "./ModuleTypes.js";


export default class ModulesRegistry extends ModuleCore {
	static type = "ModulesRegistry";
	static commands = {
		...super.commands,
		addModule: "ADD_MODULE",
		removeModule: "REMOVE_MODULE",
	}

	#modules = new Map( );
	#outputFn;

	constructor ( outputFn ) {
		console.log( `ModulesRegistry - constructor` );

		const UUID = "00000000-0000-0000-0000-000000000000";
		super ( UUID );

		this.#modules.set( UUID, this );

		this.setOutputFn( outputFn );

		this.setOnCommand( this.commands.addModule, ( data ) => this.onAddModule( data ) );
		this.setOnCommand( this.commands.removeModule, ( data ) => this.onRemoveModule( data ) );
	}
	
	setOutputFn( outputFn ) {
		console.log( `ModulesRegistry - setOutputFn` );

		super.setOutputFn( outputFn );
		this.#outputFn = outputFn;
	}

	onAddModule ( data ) {
		console.log( `ModulesRegistry - onAddModule` );

		const { type, UUID, ...moduleData } = data;
		this.addModule( type, UUID );
	}

	onRemoveModule ( data ) {
		// console.log( `ModulesRegistry - onRemoveModule` );

		const { UUID } = data;
		this.removeModule( UUID )
	}

	addModule ( type, UUID, sync = false ) { /// add change = true parameter for views & other to enable/disable onChange calls
		// console.log( `ModulesRegistry - addModule` );

		if ( this.#modules.get( UUID ) ) {
			return;
		}

		const constructor = ModuleTypes[ type ] || ModuleCore;
		const module = new constructor( UUID );
		module.setOutputFn( this.#outputFn );
		this.#modules.set( module.UUID, module );

		if ( sync ) {
			this.output( this.commands.addModule, { type, UUID } );
		}

		this.onChange( this.commands.addModule, module );
		
		return module;
	}

	removeModule ( UUID, sync = false ) {
		// console.log( `ModulesRegistry - removeModule` );

		const module = this.#modules.get( UUID );
		if ( module !== undefined ) {

			this.onChange( this.commands.removeModule, module );

			module.delete( );
			this.#modules.delete( UUID );

			if ( sync ) {
				this.output( this.commands.removeModule, { UUID } );
			}
		}
	}

	get modules ( ) {
		return this.#modules;
	}

	get modulesList ( ) {
		return [ ...this.#modules.keys( ) ];
	}

	getModule ( moduleUUID ) {
		// console.log( `ModulesRegistry - getModule ${ moduleUUID }` );

		return this.#modules.get( moduleUUID );
	}

	getState ( ) {
		const modulesData = [];
		for ( const [ UUID, module ] of this.#modules ) {
			if ( module.type == this.type ) 
				continue;

			modulesData.push( { UUID, type: module.type } );
		}

		return { modulesData }
	}

	setState ( state ) {
		for ( const moduleData of state.modulesData ) {
			const { UUID, type } = moduleData;
			this.addModule( type, UUID );
		}
	}
}