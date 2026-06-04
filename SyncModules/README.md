# SyncModules

##TODO:
ModuleCore: base class for all synchronization modules
ModulesRegistry: managers add/remove of modules 

Base types:
- ScalarModule: single number value
- ArrayModule: numbers in an array of size n
- Vector3Module: ArrayModule(3)
- Vector4Module: ArrayModule(4)
- Matrix44Module: ArrayModule(16)
- TextModule: string data
- ColorModule: ArrayModule(4)
- QuaternionModule: ArrayModule(4)
- BooleanModule
  
Actuator types
- TriggerModule
- ButtonModule: TriggerModule with graphics
- SwitchModule: booleanModule
- SliderModule: scalarModule
- JoystickModule
- InputModule
- mouseModule
- pointerModule

Other
- TransformModule
- PrimitivesModule
- MarkersModule
- CameraModule
- GLTFModule
- AnimationModule




##DONE: