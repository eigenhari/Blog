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

\\\table 

Seprate YAML files are used for each joint : Knee and ankle  allowing independent tuning of both joints. Parameters can be changed at runtime using ROS Dynamics via rqt without restating the simulation:
\\\\ include simulation of configuration 

When the controller node starts, it beggins publishing FLoat64 torque commands to the effort command topic for each joint and 

