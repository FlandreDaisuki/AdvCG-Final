# AdvCG-Final

Many code from [three.js](https://github.com/mrdoob/three.js/)

The simplest implementation of Photon mapping.

# Result

Default Material

- color: 0x000000
- glossyFactor: 0
- Kd = Ka = Ks : 1, 1, 1

## Exp1: glossyFactor

- 100000 times random spread photons
- collection range: 5

Sphere Material

- Sphere color: 0, 0, 1
- Sphere Ka: 0.5, 0.5, 0.5
- Sphere Kd: 0.05, 0.05, 0.05
- Sphere Ks: 0.5, 0.5, 0.5

![](./img/x1.png)

10532 photons collected

render time: 93.978 seconds

Sphere glossyFactor: 8

![](./img/x2.png)

10481 photons collected

render time: 91.478 seconds

Sphere glossyFactor: 16

![](./img/x3.png)

10288 photons collected

render time: 90.121 seconds

Sphere glossyFactor: 32

## Exp2: Photons Number

- collection range: 5

Sphere Material

- Sphere color: 0, 0, 1
- Sphere Ka: 0.5, 0.5, 0.5
- Sphere Kd: 0.05, 0.05, 0.05
- Sphere Ks: 0.5, 0.5, 0.5
- Sphere glossyFactor: 32

![](./img/x3.png)

100000 times random spread photons (10288 photons collected)

render time: 90.121 seconds

![](./img/xx2.png)

200000 times random spread photons (20944 photons collected)

render time: 184.383 seconds

![](./img/xx3.png)

300000 times random spread photons (31427 photons collected)

render time: 287.818 seconds

# Lisence

The MIT License