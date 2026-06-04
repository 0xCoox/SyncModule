import ModuleCore from "./Core/ModuleCore.js";

export default class PointsModule extends ModuleCore {
	static type = "PointsModule";
	static commands = {
		...super.commands,
		addPoints: "ADD_POINTS",
		removePoints: "REMOVE_POINTS",
		updatePoints: "UPDATE_POINTS",
		clear: "CLEAR",
	}

	#points = new Map( ); /// UUID -> [ x, y, z ]
	/*	point = { UUID : uuid, position: [x, y, z] } */

	constructor ( UUID ) {
		console.log( `PointsModule - constructor` );

		super( UUID );

		this.setOnCommand( this.commands.addPoints, 
			( { points } ) => this.addPoints( points )
		);
		this.setOnCommand( this.commands.removePoints, 
			( { points } ) => this.removePoints( points )
		);
		this.setOnCommand( this.commands.updatePoints, 
			( { points } ) => this.updatePoints( points )
		);
		this.setOnCommand( this.commands.clear, 
			( ) => this.clear( )
		);
	}

	get pointsUUIDs ( ) {
		return [ ...this.#points.keys( ) ];
	}

	get points ( ) {
		const points = [];
		for ( const [ UUID, position ] of this.#points ) {
			points.push( { 
				UUID,
				position: [ ...position ],
			} );
		}
		return points;
	}

	getPoint ( pointUUID ) {
		return this.#points.get( pointUUID );
	}

	addPoints ( points, sync = false ) {
		points.forEach( ({ UUID, position }) => {
			const positionCopy = [ 0, 0, 0];
			positionCopy.forEach( ( _, i ) => positionCopy[ i ] = position[ i ] || 0 );
			this.#points.set( UUID, positionCopy );
		});

		this.onChange( this.commands.addPoints, this.points );

		if ( sync ) {
			this.output( this.commands.addPoints, { points: points } );
			/// change for copy of points
		}
	}

	removePoints ( points, sync = false ) {
		points.forEach( ({ UUID }) => {
			this.#points.delete( UUID );
		});

		this.onChange( this.commands.removePoints, this.points );

		if ( sync ) {
			this.output( this.commands.removePoints, { points: points } );
			/// change for copy of points
		}
	}

	updatePoints ( points, sync = false ) {
		points.forEach( ({ UUID, position }) => {
			if ( this.#points.has( UUID ) ) {
				const positionCopy = [ 0, 0, 0];
				positionCopy.forEach( ( _, i ) => positionCopy[ i ] = position[ i ] || 0 );
				this.#points.set( UUID, positionCopy );
			}
		});

		this.onChange( this.commands.updatePoints, this.points );

		if ( sync ) {
			this.output( this.commands.updatePoints, { points: points } );
			/// change for copy of points
		}
	}

	clear ( sync = false ) {
		this.#points.clear( );

		this.onChange( this.commands.clear, this.points );

		if ( sync ) {
			this.output( this.commands.clear, { } );
		}
	}

	getState ( ) {
		const state = {
			points: this.points
		}
		return state;
	}

	setState ( state ) {
		this.addPoints( state.points );
	}
}