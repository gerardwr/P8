/* This Espruino Module to support basic functions from the P8 Smart Watch.

The essence of this module is created bij @fanoush and extended by @Enaon.
Special thanks to them for heir excellent work.

Ref : Basic LCD driver code from @fanoush :
https://github.com/fanoush/ds-d6/tree/master/espruino/DFU/P8

Ref : Code from @Enaon based on code from @fanoush:
https://github.com/enaon/ninebot-one-nRF52/tree/master/p8-nb

Use as follows:
- upload this file to "Flash (Allways)";
- upload the Test..... file to RAM
- P8 screen shows some graphics for a few secs and then switches off. Pressing the P8 button toggles the screen On and OFF
- Espruino monitor shows some debug information

*/

E.kickWatchdog();

function P8KickWd(){
  if(!D17.read())E.kickWatchdog();
}
var wdint=setInterval(P8KickWd,1000);
E.enableWatchdog(10, false);

Modules.addCached("P8",function(){

const pin = {
  BUTTON: D17,
  MOTOR: D16, 
  BATTERY: D31, 
  CHARGING: D19, 
  LCD_BL_L:D14,
  LCD_BL_M:D22,  
  LCD_BL_H:D23,  
  LCD_CLK: D2, 
  LCD_RST: D26, 
  LCD_CS: D25, 
  LCD_SI: D3,
  LCD_DC: D18, 
  //Touchscreen
  TP_SDA:D6,
  TP_SCL:D7,
  TP_RESET:D13, // P8 Watch
  TP_INT:D28,
};

var SPI2 = (function(){
  var bin=atob("AAAAAAAAAAAAAAAA/////////////////////wAAAAAAAAAAELUDTHxEIoBggKGA44AQvdT///8HS3tEm2hDsQRKE2gAK/zQACMTYANKekSTYHBHGDECQML///+u////LenwR5BGGUwZTv/35f8ZSt/4ZMAAIwElE2BP8P8OU2CpRiNgEDIfRv8pAOsDCsL4AKCLv/8zMWDG+ADgACGIv/85zPgAkLjxAA8G0Cm5C0t7RJ1gACC96PCH1PgAoLrxAA/60CdgACne0fPnGDECQEg1AkA0NQJAEDACQEz///8t6fBPm7DN6QASBJNDS3tEBkaT+ACQACh90AApe9AJ8f8yByp32AEiAvoJ8gE60rIEeAKSQniT+ASwBZNE6gIkAZqHHAirEagUQc3pBjBP6kkC0rJP8AAIpLIDkkFGBZsBnZP4AqACmwCaI0BE+gn0MvgTwAKbI0BE+gn0MvgTIAObHUTtsgctgb8IPRf4ATvtssXxCA6EvwP6DvMcQ0/qLBNDVBMSAfECDkPqDBxDGAMxqvECCiMpg/gBwKSyAPgOIF/6ivoJ3QEi//dZ/9jxAQgLvweYBphBRgAhuvEAD8HRD0t7RNuIHkS3HHN4NHhE6gMkAZscQQvx/zMT8P8LpLKs0RmxBJr/9zr/WUYIRhuwvejwj0/w/zH45w7///84/v//H7XDssDzBxIACkDqAxDAsgApjfgFAI34CACN+AsAjfgOAAhGuL/IHY34BCCN+AYwjfgHII34CTCN+AogjfgMMI34DSCN+A8wwBD/9/P+EksSTAAiGmBaYKPyHEMPKRpgAaoiYA5KT/AMBBRgwr+i9VJyT/QAMRFgCkoBIRFgCkkAIhxoACz80AIoGmDYvwpgATj20QSwEL00NQJARDUCQEg1AkAQMAJAADICQP/3wr4YsRGxASL/99G+T/D/MHBHGLERsQAi//fJvk/w/zBwR/i1Ek5+RAdG82gAKw1GFdsBJAxKBPoD8xNgIUYAIv/3tf7zaJxACEsBLRxgBN0AImkeeBz/96r+ACAB4E/w/zD4vQC/DAUAUAgFAFAk/f//Ckp6RBC10mgAKgrbSLFBsQEjk0AEShNgACL/94/+ACAQvU/w/zD75wgFAFDW/P//MLUVTANGIGgQuxlKekQVaQAtHNtVaQAtAtqSaQAqFtsOShBoUGATSg1IekQbBhVpBWCVaUVgUGkKShBgU2EKS0kAGWAHIyNgCEsBIBhgML1P8P8w++cAvwA1AkAEMwJACDUCQBA1AkBUNQJAFDACQJz8//9+/P//BUsbaAuxBUoTYAVKACMTYKL1fnITYHBHBDMCQAgzAkAANQJABUsGSQAiGmAFSnpE0GkIYBJqGmBwRwC/ADUCQAQzAkAC/P//BEsaaAVLe0TaYQNKEmgaYnBHAL8EMwJAADUCQOL7//8QtQNMfETE6QUhIGHjYBC9xPv//w==");
  return {
    cmd:E.nativeCall(725, "int(int,int)", bin),
    data:E.nativeCall(805, "int(int,int)", bin),
    write:E.nativeCall(709, "int(int,int)", bin),
    write_async:E.nativeCall(693, "int(int, int)", bin),
    async_wait:E.nativeCall(689, "void()", bin),
    fill_color:E.nativeCall(517, "int(int,int)", bin),
    setpins:E.nativeCall(1077, "void(int,int,int,int)", bin),
    enable:E.nativeCall(853, "int(int,int)", bin),
    disable:E.nativeCall(973, "void()", bin),
    save:E.nativeCall(1045, "void()", bin),
    restore:E.nativeCall(1009, "void()", bin),
    blit_setup:E.nativeCall(37, "void(int,int,int,int)", bin),
    blt_pal:E.nativeCall(225, "int(int,int,int,int)", bin),
  };
})();


//P8 pins
CS=D25;DC=D18;RST=D26;BL=D14;

RST.reset();
// CLK,MOSI,CS,DC
D2.write(0);D3.write(0);CS.write(1);DC.write(1);
SPI2.save();
SPI2.setpins(2,3,-1,18);
SPI2.disable();SPI2.enable(0x80,0); //8MBit, mode 0

function lcd_cmd(arr){
  var b=E.toString(arr); // flat string buffer
  if (!b){print("lcd_cmd: OOPS, undefined");E.defrag();b=E.toString(arr); }
  if (!b){print("lcd_cmd: OOPS again!");E.defrag();b=E.toString(arr); }
  CS.reset();
  SPI2.cmd(E.getAddressOf(b,true),b.length);
  CS.set();
}
function lcd_data(arr){
  const b=E.toString(arr); // flat string
  CS.reset();
  SPI2.cmd(E.getAddressOf(b,true),b.length);
  CS.set();
}
RST.set();

// CS.reset(); t=getTime();SPI2.fill_color(0xfff,240*240);t=getTime()-t; CS.set();t
// digitalPulse(RST,0,10);BL.set();

var bpp=4; // powers of two work, 3=8 colors would be nice
var g=Graphics.createArrayBuffer(240,240,bpp);
var pal;
switch(bpp){
  case 2: pal= Uint16Array([0x000,0xf00,0x0f0,0x00f]);break; // white won't fit
//  case 1: pal= Uint16Array([0x000,0xfff]);break;
  case 1:
  pal= Uint16Array( // same as 16color below, use for dynamic colors
    [ 0x000,0x00a,0x0a0,0x0aa,0xa00,0xa0a,0xa50,0xaaa,
      0x555,0x55f,0x5f5,0x5ff,0xf55,0xf5f,0xff5,0xfff ]);
  g.sc=g.setColor;
  c1=pal[1]; //save color 1
  g.setColor=function(c){ //change color 1 dynamically
    c=Math.floor(c);
    if (c > 1) {
      pal[1]=pal[c]; g.sc(1);
    } else if (c==1) {
      pal[1]=c1; g.sc(1);
    } else g.sc(c);
  }; break;
  case 4: pal= Uint16Array( // CGA
    [
// 12bit RGB444
      0x000,0x00a,0x0a0,0x0aa,0xa00,0xa0a,0xa50,0xaaa,
     0x555,0x55f,0x5f5,0x5ff,0xf55,0xf5f,0xff5,0xfff
//16bit RGB565
//      0x0000,0x00a8,0x0540,0x0555,0xa800,0xa815,0xaaa0,0xad55,
//      0x52aa,0x52bf,0x57ea,0x57ff,0xfaaa,0xfabf,0xffea,0xffff

    ]);break;
}

INITCMDS = [
  // This is an unrotated screen
  [0x36, 0],     // MADCTL
  [0x37,0,0],
  // These 2 rotate the screen by 180 degrees
  //[0x36,0xC0],     // MADCTL
  //[0x37,0,80],   // VSCSAD (37h): Vertical Scroll Start Address of RAM
  [0x3A, 0x03],  // COLMOD - interface pixel format - 03 - 12bpp, 05 - 16bpp
  [0xB2, 0xC, 0xC, 0, 0x33, 0x33], // PORCTRL (B2h): Porch Setting
  [0xB7, 0],     // GCTRL (B7h): Gate Control
  [0xBB, 0x3E],  // VCOMS (BBh): VCOM Setting 
  [0xC2, 1],     // VDVVRHEN (C2h): VDV and VRH Command Enable
  [0xC3, 0x19],  // VRHS (C3h): VRH Set 
  [0xC4, 0x20],  // VDVS (C4h): VDV Set
  [0xC5, 0xF],   // VCMOFSET (C5h): VCOM Offset Set .
  [0xD0, 0xA4, 0xA1],   // PWCTRL1 (D0h): Power Control 1 
  [0xe0, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f],   // PVGAMCTRL (E0h): Positive Voltage Gamma Control
  [0xe1, 0x70, 0x15, 0x20, 0x15, 0x10, 0x09, 0x48, 0x33, 0x53, 0x0B, 0x19, 0x15, 0x2a, 0x2f],   // NVGAMCTRL (E1h): Negative Voltage Gamma Contro
  [0x29], // DISPON (29h): Display On 
  [0x21], // INVON (21h): Display Inversion On
  [0x2a,0,0,0,239],
  [0x2b,0,0,0,239],
  [0x2c]
];

g.init=function(f){
  lcd_cmd([0x11]); // sleep out
  setTimeout(()=>{
    BL.reset();
    INITCMDS.forEach((a)=>{lcd_cmd(a);});
    if (f !== undefined) f();
  },120);
};

g.off=function(){
  lcd_cmd([0x10]);
  BL.set();
  isOff=true;
};

g.on=function(){
  lcd_cmd([0x11]);
  BL.reset();
  isOff=false;
};

g.flip=function(){
  var r=g.getModified(true);
  //print(r);
  if (r === undefined) return;
  var x1=r.x1&0xfe;var x2=(r.x2+2)&0xfe; // for 12bit mode align to 2 pixels
  var xw=(x2-x1);
  var yw=(r.y2-r.y1+1);
  var stride=g.getWidth()*bpp/8;
  lcd_cmd([0x2a,0,x1,0,x2-1]);
  lcd_cmd([0x2b,0,r.y1,0,r.y2]);
  lcd_cmd([0x2c]);
  SPI2.blit_setup(xw,yw,bpp,stride);
  var xbits=x1*bpp;
  var bitoff=xbits%8;
  var aoff=(xbits-bitoff)/8;
  var pa=E.getAddressOf(pal.buffer,true);
  var a=E.getAddressOf(g.buffer,true)+aoff+r.y1*stride; // address of upper left corner
  CS.reset();
  SPI2.blt_pal(a,pa,bitoff,0); // 0=not async, becasuse of CS
  CS.set();
};

function fillTest(){
  // direct fill test , no framebuffer
    var w=40;
    [
      0xf00,0x0f0,0x00f,0xfff,
      0xff0,0x0ff,0xf0f,0xfff,
      0x000,0xf00
    ].forEach((c)=>{
      [
        [0x2a,0,w/2,0,239-w/2],
        [0x2b,0,w/2,0,239-w/2],
        [0x2c]
      ].forEach((a)=>{lcd_cmd(a);});
      CS.reset();SPI2.fill_color(c,(240-w)*(240-w));w+=20;
    });
  CS.set();
}



// is started up first, init the LCD
setTimeout(()=>{
g.init(function(){
  g.clear();
  // flashes at start, then goto sleep
  fillTest();
  sleep();
});
},500);

var isOff=false;

function sleep(){
  g.clear();g.flip();
  g.off();
  isOff=true;
  currscr=-1;
  return 0;
}

function isCharging(){
  return pin.CHARGING.read();
}

function getBatteryPercentage(){
  return battery() / 4.2 * 100 ;
}

function isLCDOn(){
  return !isOff;
}
  
function buzz(time,strength){
  digitalPulse(P8.pin.MOTOR,1,[100,30,100,30,100]);
}

function on(){
	g.on();
}

function off(){
	g.off();
}

function setLCDBrightness(brightness){
	//brightness between 0..1, convert to 0..7
	g.bri( Math.round(brightness * 10 /8) );
}

function setLCDPower(isOn){
  if(isOn) lcd_cmd([0x11]);
  else   lcd_cmd([0x10]);
}

module.exports = {
	pin:pin,
	g:g,
  isCharging: isCharging,
  buzz: buzz,
  isLCDOn: isLCDOn,
  setLCDBrightness: setLCDBrightness,
  setLCDPower: setLCDPower,
  sleep:sleep,
  on: on,
  off: off  
};

}); // end of Module
