import ModulesRegistry from "./SyncModules/Core/ModulesRegistry.js";

const COMMANDES_FRONT = new Set([
    "changeMesh", 
    "flipEyes", 
    "changePointSize", 
    "changeClippingHeight", 
    "moveTree",         
    "moveTreeDepth"    
]);

export default class Instance {
    #UUID;
    #usersUUID = new Set();
    #outputFn;
    #moduleRegistry;

    constructor ( UUID ) {
        this.#UUID = UUID;
        
        this.#moduleRegistry = new ModulesRegistry( ( payload ) => {
            console.log("module registry output");
            this.output( this.users, payload );
        } );
    }

    setOutputFn ( outputFn ) {
        this.#outputFn = outputFn;
    }

    addUser ( userUUID ) {
        this.#usersUUID.add( userUUID );
        this.log();

        this.outputState( userUUID );
    }

    removeUser ( userUUID ) {
        this.#usersUUID.delete( userUUID );
        this.log();
    }

    get users () {
        return [ ...this.#usersUUID.keys() ];
    }

    log () {
        console.log( `instance ${ this.#UUID } - ${ [ ...this.#usersUUID.keys() ] }`);
    }

    get UUID () {
        return this.#UUID;
    }

    input ( payload ) {
        console.log( `Instance - input` );
        const { moduleUUID, command, data } = payload;
        
        console.log( moduleUUID, command );

		if (COMMANDES_FRONT.has(command)) {
			console.log(`[Intercepteur] Commande front-end détectée (${command}). Rediffusion directe !`);
			
			const messageAEnvoyer = {
				scope: "MODULE",
				payload: {
					command: command,
					data: data
				}
			};
			
			const destinataires = [ ...this.users, moduleUUID ];
			
			// On filtre les UUIDs qui ne sont pas enregistrés côté serveur
			this.output( destinataires, JSON.stringify(messageAEnvoyer) );
			return; 
		}

        const targetModule = this.#moduleRegistry.getModule( moduleUUID );
        
        if (targetModule !== undefined) {
            targetModule.input( payload );    
        } else {
            console.log(`📡 [Mode Répéteur] Module inconnu (${moduleUUID}). Rediffusion...`);
            const messageAEnvoyer = { scope: "MODULE", payload: { command, data } };
            
            const destinataires = [ ...this.users, moduleUUID ];
            this.output( destinataires, JSON.stringify(messageAEnvoyer) );
        }
    }

    output ( userUUIDs, payload ) {
        console.log( `Instance - output` );
        
        this.#outputFn?.( userUUIDs, payload );
    }

    outputState ( userUUID ) {
        console.log( `Instance - outputState` );
        
        const registryState = this.#moduleRegistry.outputState();

        this.output( [ userUUID ], registryState );

        for ( const [ moduleUUID, module ] of this.#moduleRegistry.modules ) {
            if ( module.type == this.#moduleRegistry.type ) 
                continue;

            const moduleState = module.outputState();
            this.output( [ userUUID ], moduleState );
        }
    }
}