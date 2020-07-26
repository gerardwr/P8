# P8


This Repo contains ongoing work to develop a generic Espruino Module to support basic functions from the P8 Smart Watch.


DISCLAIMER
===========
The content of this repo is in development, and may change at any time. Be Warned.

My Starting Point
==================
The essence of this module is created by @fanoush, @atc1441, and @enaon.

Special thanks to them for their excellent work.

Ref : Basic LCD driver code from @fanoush :
https://github.com/fanoush/ds-d6/tree/master/espruino/DFU/P8
If your interested in development for Nrf52832 devices there is a lot of excellent information in his Github.

Ref : Code from @Enaon based on code from @fanoush:
https://github.com/enaon/ninebot-one-nRF52/tree/master/p8-nb

Ref : For flashing firmware to the P8 watch you use an Android App developed by @atc1441.
https://github.com/atc1441/DaFlasherFiles

Ref : https://gitter.im/nRF51822-Arduino-Mbed-smart-watch/Lobby#
I learned a lot on programmaing NRF52832 devices by following this Gitter

Ref : Information on Espruino, Javascript for microcontroller and Espruino hardware device
http://www.espruino.com

Many thanks to all of the above for sharing their amazing work.

My Additions
=============
My additions follow the Espruino Bangle syntax when possible, that saves me from making some documentation ;-)
Ref : https://www.espruino.com/Reference#Bangle

Special thanks to @gordon for sharing Espruino to the world and supporting it in a terrific way, kodos!

Install the Espruino Module
- Use the Espruino WebIde to upload the "P8Espruino...." file to "Flash (Allways)"

Load a example Espruino programm
- Use the Espruino WebIde to the "Test....." file to RAM

The example
- The P8 screen shows some graphics for a few secs and then switches off.
- Pressing the P8 button toggles the screen On and OFF
- Espruino monitor shows some debug information

![Image](https://github.com/gerardwr/P8/edit/master/README.md)

ISSUES
=======
I develop for my own fun, so I lack the time to give a lot of support in using this code.

But if you find a bug in the module, or have some interesting changes/additions, open an "Issue".
