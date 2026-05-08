---
slug: simulation-prosthetic-leg
title: Simulation of Prosthetic Leg in ROS2
authors:
  eigenhari
tags: [Robotics, Simulation, Prosthetics, Biomechanics]
---
## Project Overview
![simulation overview](https://raw.githubusercontent.com/eigenhari/Legged-Robotics/main/leg_control/photo%20and%20gif/Overall%20leg%20.jpg)

From the above figure, we obtain the transverse (or axial), frontal (or lateral), and sagittal planes of motion of the human body. These correspond to the yaw/heading, lean/roll, and pitch degrees-of-freedom, respectively, at the ankle, and we derive all parameters by referencing these planes from the diagram.

### Introduction
Along with Pawan Shah, I developed an Active Prosthetics leg simulation in the Robot Operating System (ROS). It provides simulation interfaces to model, actuate, and test a robotic leg system entirely inside the Gazebo physics simulator, without needing physical hardware. This project aims to unify the research field of prosthetic leg control by providing a common, open, and reproducible platform, making it accessible for simulation-based research and algorithm development.

### Project Stack

| Component | Details |
|---|---|
| **Simulation Engine** | Gazebo (tested with Humble / ROS 2) |
| **Middleware** | ROS 2 (Robot Operating System) — Humble preferred |
| **Motor Plugins** | gazebo_ros_motors (nilseuropa) — DC Motor and Servo plugins |
| **Build System** | colcon (standard ROS 2 workspace) |
| **Controller Language** | Python (oslsim_controller node) |
| **Configuration** | YAML files + ROS 2 Parameters (rqt) |
| **Robot Description** | URDF / Xacro (osl.urdf.xacro) |
| **Sensor Simulation** | Gazebo IMU plugin + Bumper (contact) plugin for load cell |
| **Actuators** | 2 motors: osl_knee, osl_ankle (DC motor simulation) |

![Coordinate frame](https://raw.githubusercontent.com/eigenhari/Legged-Robotics/main/leg_control/photo%20and%20gif/riviz%20photo.png)

## Physical Hardware Model

### Mechanical Structure
This is a modular, lower-limb robotic prosthesis. In the simulation model, the following rigid body links are defined in the URDF:
   - **Thigh:** The proximal (upper) segment, attached to the residual limb socket
   - **Shank:** The lower leg segment, bridging the knee joint to the ankle
   - **Foot:** The distal ankle segment where the load cell is embedded

### Degrees of Freedom
In our system, there are two joints — Knee and Ankle — both of which are revolute (single-axis) joints. The knee joint achieves at least 60 degrees of flexion for normal gait, while the ankle requires approximately 5 degrees of dorsiflexion and 20 degrees of plantarflexion to replicate natural human walking patterns. In this simulation, these are modeled as effort-controlled revolute joints, meaning the control input is a torque command.


## Configuration in Simulation
### Launch Sequence
The entire simulation is started with a single launch command:

```bash
ros2 launch oslsim main.launch.py control:=true
```
![Run in simulation](https://raw.githubusercontent.com/eigenhari/Legged-Robotics/main/leg_control/photo%20and%20gif/leg_daigram_simulation.jpg)


First, the Gazebo world is initialized with the physics engine (gravity, ground plane), and the URDF model is loaded into Gazebo via the robot description parameter. The ROS 2 control spawner then loads the controller configuration from YAML for both joints, after which the gazebo_ros motor plugin is initialized for the knee and ankle joints. The IMU sensors are then activated and begin publishing orientation data, and the load cell activates. If `control:=true`, the controller node starts and begins publishing joint commands.

### Motor Plugin Initialization
In ROS 2, there is no built-in motor package, so we developed a custom motor package and modeled each motor as a DC motor with the following electrical and mechanical parameters defined in YAML:

| YAML Parameter | Physical Meaning |
|---|---|
| **motor_nominal_voltage** | Operating voltage of the motor (Volts) |
| **back_emf_constant** | Relates angular velocity to back-EMF voltage (V·s/rad) |
| **motor_resistance** | Armature winding resistance (Ohms) |
| **motor_torque_constant** | Relates current to output torque (N·m/A) |
| **moment_of_inertia** | Rotational inertia of motor rotor (kg·m²) |
| **motor_viscous_friction** | Damping coefficient opposing rotation |
| **encoder_ppr** | Pulses per revolution of the simulated rotary encoder |

Separate YAML files are used for each joint (Knee and Ankle), allowing independent tuning of both joints. Parameters can be changed at runtime using ROS Dynamic Reconfigure via rqt without restarting the simulation:
![Motor configuration](https://raw.githubusercontent.com/eigenhari/Legged-Robotics/main/leg_control/photo%20and%20gif/dyn_reconf%20(1).gif)


When the controller node starts, it begins publishing Float64 torque commands to the effort command topic for each joint. The motor plugin receives these commands and converts the commanded effort to simulated motor current using the torque constant, computes back-EMF from the current joint velocity, and simulates the motor electrical equation: `V = IR + K_e·ω`. It then updates angular acceleration using Newton's second law: `τ_net = J·α`, advances joint position and velocity in the physics simulation at each time step, and publishes updated motor joint states (position, velocity, effort) back to ROS 2 topics.



## Torque Control

### Effort-Based Control Architecture
We use ros_control with the effort controller package. The control interface type for each joint is `EffortJointInterface`, meaning the controller abstraction models a torque-based controller.


![Control Architecture](https://raw.githubusercontent.com/eigenhari/Legged-Robotics/main/leg_control/leg_control.jpg)

Overall, the controller receives sensor data from the human-prosthesis system and returns (typically joint-level) torques. Furthermore, all controllers generally contain the shared components: high-level task and gait phase estimation; mid-level desired torque computation with a reference trajectory; and a low-level controller that commands the desired torque from the actuators.


### PID Controller
The controller ROS 2 node included in the package implements a classic PID position controller for each joint. The control loop works as follows:

**PID Control Law**

$$
\tau = K_p (\theta_{\text{desired}} - \theta_{\text{actual}}) + K_d \frac{d}{dt}(\theta_{\text{desired}} - \theta_{\text{actual}}) + K_i \int (\theta_{\text{desired}} - \theta_{\text{actual}}) dt
$$

**Where:**
- $\tau$ = commanded torque
- $\theta$ = joint angle
- $K_p$ = proportional gain
- $K_i$ = integral gain
- $K_d$ = derivative gain

The node subscribes to the joint state topics to read the actual position, computes the error against a desired trajectory, and publishes Float64 torque commands to each joint's command topic:

![PID gif](https://raw.githubusercontent.com/eigenhari/Legged-Robotics/main/leg_control/photo%20and%20gif/PID.gif)




## Ankle and Knee Joints
  ### Ankle Joint Mechanics
  The ankle joint connects the shank and foot links. It is a single-axis revolute joint rotating in the sagittal plane, enabling:

  - **Plantarflexion:** Pointing the toes downward (positive torque convention)
  - **Dorsiflexion:** Lifting the toes upward (negative torque)

  Normal human ankle biomechanics require approximately 5 degrees of dorsiflexion and 20 degrees of plantarflexion, and the system is designed to meet or exceed these ranges.

### Ankle's Role in the Gait Cycle
The ankle is the most critical joint in prosthetic locomotion from an energy perspective. During normal gait, the ankle performs nearly 80% of the positive mechanical work during the stance phase. In the FSM controller, the ankle controller has four phases:

| Gait State | Ankle Behavior |
|---|---|
| **Early Stance (e_stance)** | Foot flat on ground. Ankle held at near-neutral angle with moderate stiffness. Absorbs impact energy. |
| **Late Stance (l_stance)** | Body weight shifts forward. Ankle plantarflexes progressively. High stiffness + damping for push-off. |
| **Early Swing (e_swing)** | Foot leaves ground. Ankle dorsiflexes to toe clearance angle. Low impedance for free motion. |
| **Late Swing (l_swing)** | Leg swings forward. Ankle repositions to heel-strike angle. Moderate stiffness to prepare for landing. |

In the simulation, the ankle operates as follows: the controller computes the desired ankle angle from the FSM state trajectory, then the PID law converts the angle error and velocity to a torque command. The torque command is published to the ankle command topic as a Float64, and ROS control passes the torque to the Gazebo physics engine via the effort interface. The Gazebo physics engine applies the torque to the ankle joint, causing angular acceleration, and the new joint angle and velocity are returned via joint state messages, completing the feedback loop.


### Knee Joint Mechanics
The knee joint connects the thigh and shank links. It is a single-axis revolute joint rotating primarily in the sagittal plane, enabling:

- **Flexion:** Bending the shank rearward (positive torque convention)  essential during the swing phase for foot clearance
- **Extension:** Straightening the leg (negative torque) critical during the stance phase for weight bearing and stability

Normal human knee biomechanics require approximately 60–70 degrees of peak flexion during the swing phase and near full extension (0–5 degrees) during the stance phase to support body weight. The knee joint is modeled in the URDF with joint limits set to these physiological ranges.

### Knee Joint's Role in the Gait Cycle
The knee plays a dual role in prosthetic locomotion: it must be stiff and stable during the stance phase to bear body weight, yet flexible and dynamic during the swing phase to achieve adequate foot clearance. In the FSM controller, the knee controller has four phases:

| Gait State | Knee Behavior |
|---|---|
| **Early Stance (e_stance)** | Knee remains near full extension. High stiffness is applied to resist collapse under body weight and absorb heel-strike impact. |
| **Late Stance (l_stance)** | Slight knee flexion (approx. 15°) as the body vaults over the stance leg. Moderate impedance allows controlled yield. |
| **Early Swing (e_swing)** | Rapid knee flexion (up to 60–70°) to lift the foot clear of the ground. Low impedance enables fast, free motion. |
| **Late Swing (l_swing)** | Knee extends back toward neutral in preparation for heel strike. Moderate damping decelerates extension and prevents hyperextension. |

In the simulation, the knee operates as follows: the FSM controller determines the current gait phase using load cell (ground contact) and IMU (limb orientation) feedback. Based on the gait phase, the desired knee angle trajectory is selected. The PID controller computes the torque command from the angle error and velocity error, publishes a Float64 torque to the knee command topic, and ROS control passes it to the Gazebo physics engine via the effort interface. The physics engine applies the torque to the knee joint, updating the joint angle and velocity, which are returned via joint state messages and fed back to the controller, closing the loop.

#### Knee Joint Impedance Strategy
Unlike a purely position-controlled joint, the knee benefits from an impedance control strategy that adjusts the effective stiffness (`K`) and damping (`B`) based on the gait phase:

$$
\tau_{knee} = K(\theta_{desired} - \theta_{actual}) + B(\dot{\theta}_{desired} - \dot{\theta}_{actual})
$$

- During **stance**: High `K` and moderate `B` to maintain stable, load-bearing extension
- During **early swing**: Low `K` and low `B` to allow rapid, unimpeded flexion
- During **late swing**: Moderate `K` and high `B` to decelerate the swinging shank and prepare for heel strike

This variable-impedance approach more closely mimics the neuromuscular control of a biological knee and is implemented in the ROS 2 controller node by switching parameter sets based on the FSM state signal.


## Feedback System
 ### IMU Sensors in Feedback System
 #### Sensor Configuration
 The simulation model includes 2 Inertial Measurement Units (IMUs): one mounted on the shank segment, which measures shank segment orientation and angular velocity — critical for ankle and knee angle estimation — and one on the thigh segment, which measures thigh/socket orientation used for total leg orientation and hip kinematics reference. In the URDF, each IMU is defined as a Gazebo sensor plugin that publishes sensor messages.

 Each IMU sensor publishes a ROS sensor message containing: a 3D orientation estimate as a quaternion (w, x, y, z) derived from gyroscope integration and accelerometer correction, gyroscope readings of angular velocity, and accelerometer readings of linear acceleration.
 To obtain clean orientation estimates in the simulation, we use Gazebo's built-in IMU plugin, which adds configurable Gaussian noise to model real sensor characteristics.

 #### IMU in Feedback Loop

 **Shank IMU**

 The shank IMU's pitch angle (rotation about the mediolateral axis) gives the sagittal plane orientation of the shank. Combined with the ankle joint encoder angle, this allows the controller to estimate the absolute ankle angle relative to the ground, not just the relative motor angle. This is critical for maintaining correct foot clearance during swing and appropriate plantarflexion angle during push-off.

 **Thigh IMU**

 The thigh IMU pitch angle gives the orientation of the proximal segment. Combined with the shank IMU, it gives the knee flexion angle independently of motor encoder drift. This provides a reliable, redundant measurement for knee angle.
 So, with the help of these sensors, we are able to detect the gait phase without relying solely on the load cell.

![IMU gif](https://raw.githubusercontent.com/eigenhari/Legged-Robotics/main/leg_control/photo%20and%20gif/IMU.gif)




### Load Cell in Feedback System
 #### Sensor Configuration
 The load cell is simulated using Gazebo's bumper (contact force) plugin attached to the foot link. The bumper plugin publishes contact information whenever the foot collides with the ground or other objects in the simulation world. A Python script included in the package subscribes to the raw bumper topic, extracts the relevant channels, and republishes them to clean ROS topics.

| Channel | Physical Meaning |
|---|---|
| **fx** | Force in X direction (anterior-posterior, N) — braking/propulsion forces |
| **fy** | Force in Y direction (mediolateral, N) — side-to-side stability forces |
| **fz** | Force in Z direction (vertical, N) — ground reaction force (most critical) |
| **Tx** | Torque about X axis (N·m) — ankle inversion/eversion moment |
| **Ty** | Torque about Y axis (N·m) — ankle plantarflexion/dorsiflexion moment |
| **Tz** | Torque about Z axis (N·m) — axial torque / rotational friction |
| **Contact Positions** | 3D coordinates of foot-ground contact points |
| **Contact Normals** | Unit vectors of surface normal at each contact point |

#### Load Cell in the Control Feedback Loop

##### Ground Contact Detection
The most fundamental use of the load cell is detecting when the foot touches or leaves the ground. The vertical force `fz` is monitored against a threshold:
- `fz > threshold` → foot contact → stance phase → high impedance ankle parameters
- `fz < threshold` → foot airborne → swing phase → low impedance, free-moving ankle

#### Transition Between FSM States
The Finite State Machine (FSM) walking controller uses load cell readings as primary transition triggers:
- Early stance → late stance: `fz` reaches body-weight threshold, indicating full weight acceptance
- Late stance → early swing: `fz` drops below threshold, indicating push-off and toe-off
- Late swing → early stance: `fz` rises sharply, indicating heel strike

In advanced implementations, the commanded ankle torque is proportional to `fz` (the normalized vertical ground reaction force). When `fz = 0` (swing), ankle torque = 0. When `fz = body weight`, maximum plantarflexion assistance torque is applied. This makes the prosthesis automatically adapt to partial weight bearing.

#### Logging and Monitoring
The Python load cell bridge script republishes selected channels (especially `fz`) to dedicated topics that the controller subscribes to, keeping the control pipeline clean and decoupled from the raw bumper plugin output.


![Load cell gif](https://raw.githubusercontent.com/eigenhari/Legged-Robotics/main/leg_control/photo%20and%20gif/Loadcell.gif)
