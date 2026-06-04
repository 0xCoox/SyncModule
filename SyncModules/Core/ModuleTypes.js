import ModuleCore from "./ModuleCore.js"
import ScalarModule from "../ScalarModule.js"
import Vector3Module from "../Vector3Module.js"
import TransformModule from "../TransformModule.js"
import PrimitiveModule from "../PrimitiveModule.js"
import LineModule from "../LineModule.js"
import CameraModule from "../CameraModule.js"
import PointsModule from "../PointsModule.js"
import TextModule from "../TextModule.js"
import TextLogModule from "../TextLogModule.js"
import FileModule from "../FileModule.js"
import TriggerModule from "../TriggerModule.js"
import GLTFModule from "../GLTFModule.js"

const ModuleTypes = {
	[ ModuleCore.type ]: ModuleCore,
	[ ScalarModule.type ]: ScalarModule,
	[ Vector3Module.type ]: Vector3Module,
	[ TransformModule.type ]: TransformModule,
	[ PrimitiveModule.type ]: PrimitiveModule,
	[ LineModule.type ]: LineModule,
	[ CameraModule.type ]: CameraModule,
	[ PointsModule.type ]: PointsModule,
	[ TextModule.type ]: TextModule,
	[ TextLogModule.type ]: TextLogModule,
	[ FileModule.type ]: FileModule,
	[ TriggerModule.type ]: TriggerModule,
	[ GLTFModule.type ]: GLTFModule,
};

Object.freeze( ModuleTypes );
export default ModuleTypes;


