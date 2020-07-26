E.kickWatchdog();

function P8KickWd(){
  if(!D17.read())E.kickWatchdog();
}
var wdint=setInterval(P8KickWd,1000);
E.enableWatchdog(10, false);



function info(){
  print("function info");
  g.on();
  g.clear();
  
  // g.setFont("6x8",2);
  g.setFont("Vector", 20);
  g.setColor(10);
  g.drawString("Espruino "+process.version,30,20);
  g.flip();

  for (var c=0;c<8;c++){
    g.setColor(c+8);
    g.fillRect(20+25*c,185,45+25*c,205);
    g.flip();
  }
  
  for ( c=0;c<8;c++) {g.setColor(c);
    g.fillRect(20+25*c,210,45+25*c,230);
    g.flip();
  }

  // added by gwr
  g.setFont("Vector", 15);
  for ( c=0;c<8;c++) {
    g.setColor(c);
    y = 40+c*17;
    g.drawString("Color " + c,0,40+c*17);
    g.fillRect(80,y,95,y+15);
    g.flip();
  }
  for ( c=0;c<8;c++) {
    g.setColor(c+8);
    y = 40+c*17;
    g.drawString("Color " + (c+8),120,y);
    g.fillRect(200,y,215,y+15);
    g.flip();
  }
  g.flip();
}


// MAIN

// require the P8 module
P8=require("P8");
g=P8.g;

// when charger is connected or disconnect
setWatch(function(){
  P8.buzz(1,1);
  if(P8.isCharging()){
    print("\nCHARGING ON");
    P8.buzz(1,1);
  }
  else{
    print("\nCHARGING OFF");
    }
},P8.pin.CHARGING,{ repeat:true,debounce:25 }
);

// pushing the P8 button turns the P8 screen ON for a few secs or OFF
setWatch(function(){

  if(P8.isLCDOn()) P8.off();
  else{
    P8.on();
    print("Wait a few seconds before the screen is turned off");
    setTimeout(function () {
      console.log("Screen is turned off now");
      P8.off();
    }, 5000);
  }
  print("\nP8.isLCDOn:", P8.isLCDOn());
},P8.pin.BUTTON,{ repeat:true, edge:'rising',debounce:25 }
);

// your code starts here

P8.buzz(1,1);

info();

