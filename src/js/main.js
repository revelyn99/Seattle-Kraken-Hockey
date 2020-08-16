function initScrollMagic() {
  controller = new ScrollMagic.Controller();
  ////////
  // #region Intro
  var controller,
    $lgoBody = $("#s-logo"),
    $lgoShd = $("#s-logo #shd-2"),
    $lgoEye = $("#s-logo #eye-3"),
    $sclLine = $("#scroll div"),
    $nl = $("#nl"),
    $leadNhl = $("#lead #nhl-logo"),
    $leadBg = $("#lead"),
    $leadTxt = $("#lead h1"),
    $aLogoBdy = $("#a-logo"),
    $aLogoBas = $("#a-logo #bas"),
    $aLogoEye = $("#a-logo #eye"),
    $aLogoLin = $("#a-logo #lin"),
    $aMrkType = $(".a-mrk-wrap *"),
    $aLogoZom = $("#a-logo #zom"),
    $bgTop = $("#bg-top"),
    $buildSvg = $("#logo-k"),
    $buildBas = $("#kbas path"),
    $buildHlt = $("#khlt"),
    $buildSea = $("#ksea path"),
    $missionh3 = $("#mission #mrk-1 h3"),
    $missionhSVG = $("#mission #mrk-1 h2"),
    $vidDiv = $("#video svg .dive"),
    $vidPly = $("#video svg .playBtn"),
    $sweater = $("#sweater .sweater-img"),
    $roots = $("#roots .layers");

  // prettier-ignore
  var  tlOpen = gsap.timeline({ delay: .5, repeat: 0 });

  // prettier-ignore
  tlOpen
  .to($leadNhl, .1,             { alpha: 1 },                                           "go")
  .to($leadNhl, .1,             { alpha: 0 },                                           "go+=1.4")
  .set($leadTxt,                { visibility: "visible" },                              "go+=.2")
  .set($leadTxt,                { text: "SEATTLE", color: "#99d9d9" },                  "+=0")
  .set($leadBg,                 { backgroundColor: "#001628" },                         "+=0")
  .set($leadTxt,                { text: "KRAKEN", color: "#001628" },                   "+=.35")
  .set($leadBg,                 { background: "#99d9d9" },                              "+=0")
  .set($leadTxt,                { text: "", color: "#fff" },                            "+=.35")
  .set($leadBg,                 { background: "none" },                                 "+=0")
  .fromTo($lgoBody,  2.5,       { scale: .9 }, { scale: 1, ease: "power2.out" },     "lgo+=.5")
  .fromTo($lgoBody,  3.5,       { alpha: 0  }, { alpha: 1 }, "lgo+=.6")
  .fromTo($lgoShd,  1,          { alpha: 0 }, { alpha: 1 }, "lgo+=1")
  .fromTo($lgoEye,  1,          { alpha: 0 }, { alpha: 1 }, "lgo+=1")
  .to($nl, 0.25,                { alpha: 1 }, "lgo+=1.4")
  .from($sclLine, 1,            { height: 0 }, "lgo+=2.2");

  new ScrollMagic.Scene({
    triggerElement: "body",
    triggerHook: 1,
    reverse: false,
  })
    .setTween(tlOpen)
    .addTo(controller);

  /////

  // prettier-ignore

  $aMrkType.each(function () {
    var mrkTypeTween = TweenMax.fromTo(
      this,
      1,
      { alpha: 0 },
      { alpha: 1 },
      "0"
    );
    var fltGenScene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.9,
      duration: "30%",
      reverse: true,
    })
      .setTween(mrkTypeTween)
      .addTo(controller);
  });

  var tlLogoSet = gsap.timeline();
  tlLogoSet
    // prettier-ignore
    .fromTo($aLogoBdy, 1, { y: "15%" }, { y: "-5%" });
  new ScrollMagic.Scene({
    triggerElement: "#logo-anat",
    triggerHook: 0,
    duration: "700%",
  })
    .setTween(tlLogoSet)
    .setPin("#logo-path", { pushFollowers: false })
    .addTo(controller);

  var tlLogo0 = gsap.timeline();
  // prettier-ignore
  tlLogo0

    .to(                $aLogoEye,  { alpha: 0  },  "zero+=2.0")
  // 1.6
    .to(                $aLogoBas,  { alpha: 1 },   "zero+=2.2")
    .to(                $aLogoBas,  { alpha: .15 },   "zero+=3.5")
  // 3.2
    .to(                $aLogoLin,  { drawSVG: true }, "zero+=4.0")
    .to(                $aLogoLin,  { drawSVG: false  }, "zero+=4.8")
  // 4.8
    .to(                $aLogoEye,  { alpha: 1  }, "zero+=5.0")
    .to(                $aLogoEye,  { alpha: 0  }, "zero+=6.2")
  // 6.4
    .fromTo(            $aLogoZom,  { scale: .8, alpha: 0, transformOrigin: "50% 50%" }, { scale: 1, alpha: 1  }, "zero+=6.4")
    .to(                $aLogoZom,  { scale: .8, alpha: 0 }, "zero+=8.0")
  // 8.0
    .to(                $aLogoBas,  { alpha: 1 }, "zero+=8.3")
    .to(                $aLogoEye,  { alpha: 1 }, "zero+=8.4");
  // 9.6

  new ScrollMagic.Scene({
    triggerElement: "#logo-anat",
    triggerHook: 1,
    duration: "650%",
  })

    .setTween(tlLogo0)
    .addTo(controller);

  var hideLogo = gsap.timeline();
  // prettier-ignore
  hideLogo
    .to(              $aLogoBdy, 1 , { alpha: 0 }, "-=0");

  new ScrollMagic.Scene({
    triggerElement: "#color",
    triggerHook: 1,
    duration: "100%",
  })

    .setTween(hideLogo)
    .addTo(controller);

  // logo build
  var tlLogob = gsap.timeline();
  // prettier-ignore
  tlLogob
  .from($buildSvg, 1,     { scale: 0.8 },     "go+=0")
  .from($buildBas, 0.35,  { alpha: 0 },       "go+=.2")
  .from($buildHlt, 0.5,   { alpha: 0 },       "go+=.7")
  .from($buildSea, 0.5,   { alpha: 0, stagger: { from: "end", amount: 0.3 } }, "go+=.7");

  new ScrollMagic.Scene({
    triggerElement: "#mrk-2",
    triggerHook: 0,
  })
    .setTween(tlLogob)
    .on("start", function (event) {
      tlLogob.time(0);
    })
    .addTo(controller);

  // Pin logo build
  new ScrollMagic.Scene({
    triggerElement: "#mrk-2",
    triggerHook: 0,
    duration: "70%",
  })
    .setPin("#mrk-2", { pushFollowers: true })
    .addTo(controller);

  // Pin logos
  new ScrollMagic.Scene({
    triggerElement: "#logos",
    triggerHook: 0,
    duration: "100%",
  })
    .setPin("#logo-lbls", { pushFollowers: false })
    .addTo(controller);

  // mission svg float

  $missionhSVG.each(function () {
    var fltTween = TweenMax.fromTo(
      this,
      1,
      { y: "-10%", alpha: 0 },
      { y: "10%", alpha: 1 },
      "0"
    );
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.8,
      duration: "70%",
      reverse: true,
    })
      .setTween(fltTween)
      .addTo(controller);
  });

  // float jersey

  var fltTween = TweenMax.fromTo($sweater, 1, { y: "-10%" }, { y: "10%" }, "0");
  new ScrollMagic.Scene({
    triggerElement: "#sweater",
    triggerHook: 1,
    duration: "200%",
    reverse: true,
  })
    .setTween(fltTween)
    .addTo(controller);

  // video float

  var vidScroll1 = gsap.timeline();
  vidScroll1.fromTo($vidPly, 1, { y: "-10%" }, { y: "10%" });
  new ScrollMagic.Scene({
    triggerElement: "#video",
    triggerHook: 1,
    duration: "200%",
  })
    .setTween(vidScroll1)
    .addTo(controller);

  var vidScroll2 = gsap.timeline();
  vidScroll2.fromTo($vidDiv, 1, { y: "10%" }, { y: "-10%" });
  new ScrollMagic.Scene({
    triggerElement: "#video",
    triggerHook: 1,
    duration: "200%",
  })
    .setTween(vidScroll2)
    .addTo(controller);

  // mission paragraphs float

  $missionh3.each(function () {
    var fltGenTween = TweenMax.fromTo(
      this,
      1,
      { y: "-15%", alpha: 0 },
      { y: "0%", alpha: 1, ease: Back.easeOut.config(2.7) },
      "0"
    );
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.8,
      duration: "100%",
      reverse: true,
    })
      .setTween(fltGenTween)
      .addTo(controller);
  });

  // backgroud image parallax
  var bgScroll = gsap.timeline();
  bgScroll.fromTo($bgTop, 1, { y: "0" }, { y: "25%" });
  new ScrollMagic.Scene({
    triggerElement: "body",
    triggerHook: 0,
    duration: "250%",
  })
    .setTween(bgScroll)
    .addTo(controller);

  // image in roots float
  $roots.each(function () {
    var rootTween = TweenMax.fromTo(this, 1, { y: "-3%" }, { y: "3%" }, "0");
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.7,
      duration: "100%",
      reverse: true,
    })
      .setTween(rootTween)
      .addTo(controller);
  });

  // end
}

$(document).ready(function () {
  initScrollMagic();
});
