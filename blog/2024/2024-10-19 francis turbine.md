---
slug: mathematical-modeling-francis-turbine
title: Mathematical modeling of Francis turbine
authors:
  eigenhari
tags: [Modeling, MATLAB, Math, optimization,turbine]
---

The Francis turbine is the most popular hydro turbine due to its ability to work well over a broad range and its high efficiency. Its important part, the runner, is connected to the common shaft of the electrical generator. Thus, the design of the runner plays a vital role in the operation of the machine. We aim to model the blade profile and runner of the Francis turbine. Among the many design approaches (Direct method, indirect method, Bovet method, and curve fitting), the Bovet method has been used to obtain the blade profile as it is found that this method provides the blade profile in the most efficient way. Based on the given input parameters: net head, discharge rate, and speed of the runner, we calculated the inlet and outlet parameters. The implementation of the Bovet Method is facilitated through computational tools, particularly MATLAB. We then plot the Meridional View, Perpendicular view, Axial view, and 3D design of the runner blade. The finding of this study helps to contribute to the design of runners by a systematic approach to the calculation of its parameters. we found the key properties of turbine hari
<!-- truncate -->

## Bovet method and Conformal mapping method

Bovet method uses empirical equations to obtain dimensional parameters of Francis runner. The dimensionless specific speed (n0) is the main parameter to find out the whole dimension of the meridional plane. This method can be used for
 sites with dimensionless specific speeds between 0.1 and 0.8. Most of the medium-head and
 low-head Francis turbines fall in this range. Considering this aspect, the Bovet method is
 used to design the low-head Francis turbine. This method becomes applicable in designing the
 meridional plane of a runner. Conformal mapping is applied for a perpendicular plane. The
 combination of both methods eases the design process and reduces time.

## Dimension
 The fundamental parameters of the turbine are net head (H), flow rate (Q), (determined by
 topographical and hydrological features of the plant), and rotational speed (nr).
 Net Head(H) = 15m
 Flow Rate(Q) = 0.3m/s
 Rotational Speed (N) = 1500rpm
 Acceleration due to gravity (g) = 9.91m/s


 ## Meridional Profile
  The dimensionless specific speed number is the key parameter used to generate the meridional
 profile of a runner channel. Dimensionless Specific Speed is given as

$$
n_o = \frac{2\pi N}{60 \times \sqrt{2gH}} \times \sqrt{\frac{Q}{\pi}} \tag{3.1}
$$

