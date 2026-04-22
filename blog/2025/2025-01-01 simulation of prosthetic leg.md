---
slug: simulation-prosthetic-leg
title: Simulation of Prosthetic Leg in ROS2
authors:
  eigenhari
tags: [Robotics, Simulation, Prosthetics, Biomechanics]
---
## Project Overview

### Introduction 
Me along with pawan shah deveploed Active Prosthestics leg simulation in Robot operating system. It provides the simulation interfaces to model, actuate and test a robotics leg system entirely inside the Gazebo physics simulator, without needing physical hardware. So this project aims to unify the  research field of prosthetic leg control by providing a common, open, and reproducing platform and make accessible for simulation-based research and algorithm development.

### Project Stack

| Component | Details |
|---|---|
| **Simulation Engine** | Gazebo (tested with Melodic / ROS 1) |
| **Middleware** | ROS (Robot Operating System) — Melodic preferred |
| **Motor Plugins** | gazebo_ros_motors (nilseuropa) — DC Motor and Servo plugins |
| **Build System** | catkin_make (standard ROS catkin workspace) |
| **Controller Language** | Python (oslsim_controller node) |
| **Configuration** | YAML files + ROS Dynamic Reconfigure server (rqt) |
| **Robot Description** | URDF / Xacro (osl.urdf.xacro) |
| **Sensor Simulation** | Gazebo IMU plugin + Bumper (contact) plugin for load cell |
| **Actuators** | 2 motors: osl_knee, osl_ankle (DC motor simulation) |


///image 

## Physical Hardware Model

### Mechanical structure
This is modular , lower-limb robotics prosthsis. In the simulation model the following rigid body link are defined in the URDF:
   Thigh: The proximal(upper) segemnet, attached to the residual limb socket

  Shank: The lower leg segement, bridging knee joint to ankel
  
  Foot: This is also a ankle segemnt where load cell is embedded
The joint connecting these links have two degree of Freedom :
 ### Degree of freedom 
 In our system their are two joint i.e Knee and ankle both joints are revolute (single axis joint). In this knee achives at least 60 degree of flexion for normal gait, while the ankle requires approximately 5 degree for dorsiflexion and 20 degree of plantarflexion to replicate natural human walking bimechanics. In thsi simulation, these are modeled as effort controlled revolute joints ,meaning the control input is torque command.\


 ## Motor confuguration in simulation 
 ### Launch Sequence
 The entire simualtion is started with a single lunch  command:
 
```bash
  ros2lunch oslsim main.lunch control =true
```
\\\image of Run 


First of all Gazebo world is initialized with the physics engine(gravity, ground plane) and the URDF model is loaded into Gazebo via robot description parameter and ros2 control spawner loads the controller configuration form YAML for both joints after that gazebo_ros motor plugin is inirialized for knee and ankle joints then IMU sensors are activated and begin publishing orinetation data and load cell activate and after that If control = true, the controller node starts and begins publishing jont commmands.

### Motor Plugin Inaitialization 
In ROS2 their isn't motor pacakage we develop the motor package and model each motor as a DC motor with the following electrical and  mechanical parameters defined in YAML:

| YAML Parameter | Physical Meaning |
|---|---|
| **motor_nominal_voltage** | Operating voltage of the motor (Volts) |
| **back_emf_constant** | Relates angular velocity to back-EMF voltage (V·s/rad) |
| **motor_resistance** | Armature winding resistance (Ohms) |
| **motor_torque_constant** | Relates current to output torque (N·m/A) |
| **moment_of_inertia** | Rotational inertia of motor rotor (kg·m²) |
| **motor_viscous_friction** | Damping coefficient opposing rotation |
| **encoder_ppr** | Pulses per revolution of the simulated rotary encoder |

Seprate YAML files are used for each joint : Knee and ankle  allowing independent tuning of both joints. Parameters can be changed at runtime using ROS Dynamics via rqt without restating the simulation:
\\\\ include simulation of configuration 

When the controller node starts, it beggins publishing FLoat64 torque commands to the effort command topic for each joint and the motor plugin trecives these command  and converts thw commanded effort to simulated motor current using thr torque constant and computes back EMF form the current joint velocity and simulate the motor electrical eqution: V = IR +K_e*omega and updates angular acceleration using Newton's second law: tau_t net = J*alpha and we can obtain advance joint position and velocity in the physics simulation at each time step and publish updated motor joint states like (positions, velocity, effort)back to ROS2 topics



## Torque Control

### Effort Based control Architecture
We use ros_control with effort controller package . The control interface type for each joint is EffortJointInteerface meaning the controller abstraction for modelling impedence or torque based controller


////architecture

### PID controller
In the controller ROS2 node include in the package implements a calssic PID position controller for each joint. The control loop works as follows:

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
The node subscribes to the joint state to read toics to read actual position, computes the error against  a desired trajectory, and publishes Float64 torque commands to each joints command topic:



## Ankle and Knee joints
  ### Ankle joint Mechanics
  The ankle joints connects with the  shank and foot link. It is a single axis revolute joint rotating in the sagittal plane, enabling 

  .Plantarflexion: pointing the toes downward (positive torque in convection) 
  . Dorsiflexion: Lifting the toes upward(negative torque)
  Normal human ankle biomechanics require approximately 5 degree of dorsiflexion and 20 degree of plantarfelxion and we designed to meet or exceed these range.

### Ankle's Role in the Gait cycle
The ankle is the most critical joint in prosthetic locomotion from an energy perspective. During normal gait, the ankle perform nearly 80% of the positive mechanical work during the stance phase. In the FSM controller, the ankle machine has four phases:

| Gait State | Ankle Behavior |
|---|---|
| **Early Stance (e_stance)** | Foot flat on ground. Ankle held at near-neutral angle with moderate stiffness. Absorbs impact energy. |
| **Late Stance (l_stance)** | Body weight shifts forward. Ankle plantarflexes progressively. High stiffness + damping for push-off. |
| **Early Swing (e_swing)** | Foot leaves ground. Ankle dorsiflexes to toe clearance angle. Low impedance for free motion. |
| **Late Swing (l_swing)** | Leg swings forward. Ankle repositions to heel-strike angle. Moderate stiffness to prepare for landing. |

In the simulation, the anke moves like this 
when controller computes desired ankle angle  form trajectory of FSM state then PID law converts angle error + velocity to a torque command and the torque command is published to ankle command topic as Float64 and ros control passes torque to Gazebo physics engine via effort interface and Gazebo physics engine applies torque to ankle joint , causing angular acceleration and New joint angle and velocity are returned via joint state and completing the feedback loop


////Remain Knee joint 




## Feedback System: 
 ### IMU Sensors in Feedback System
 #### Sensor Configuration 
 The simulation model include 2 Inertial Measurement Units(IMU) one mount on the shank segement which measures shank segement orientation and angular velocity  critical for ankle and knee angle estimation  and one on the thigh segemnt which measures thigh/socket orientaion used for total leg  orientation and hip kinematics reference .In the URDF, each IMU is defined as a Gazebo sensor plugin the publishes sensor msgs.

 Each IMU sensor publishes a ROS sensor msgs containning in which 3D orientation estimate as a quaterion (w, x, y,z)  derived form gyroscope integration and accelerometer correction in which gyroscope reading angular velocity and accelerometer reading linear acceleration.
 To get clean orientation estimates in the simulation we use Gazebo's built in IMU plugin which adds configurable Gaussian noise to model real sensor characteristics.
