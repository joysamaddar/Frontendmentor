function animateMain() {
  const t1 = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });
  t1.to(".blogp1", 0.8, { scale: 1.1, yoyo: true, repeat: -1 }, "-=1");
}

function animateBlog() {
  controller = new ScrollMagic.Controller();
  const topText = document.querySelector(".blog h1");
  const blogpost = document.querySelector(".blog_content1--container");

  const tl = gsap.timeline({
    defaults: { duration: 1, ease: "power2.inOut" },
  });
  const t2 = gsap.timeline({
    defaults: { duration: 1, ease: "power2.inOut" },
  });
  tl.fromTo(topText, 1, { opacity: 0, y: "-40%" }, { opacity: 1, y: "0%" });
  tl.to(".blogp2", 0.8, { scale: 1.1, yoyo: true, repeat: -1 }, "-=1");
  t2.fromTo(blogpost, 1, { opacity: 0, y: "-100%" }, { opacity: 1, y: "0%" });
  blogScene1 = new ScrollMagic.Scene({
    triggerElement: topText,
    triggerHook: 1,
  })
    .setTween(tl)
    // .addIndicators({
    //   colorStart: "white",
    //   colorTrigger: "white",
    // })
    .addTo(controller);

  blogScene2 = new ScrollMagic.Scene({
    triggerElement: ".blog_content1",
    triggerHook: 0.55,
  })
    .setTween(t2)
    // .addIndicators({
    //   colorStart: "blue",
    //   colorTrigger: "blue",
    // })
    .addTo(controller);
}

barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateMain();
      },
    },
    {
      namespace: "blog",
      beforeEnter() {
        animateBlog();
      },
      beforeLeave() {
        blogScene1.destroy();
        blogScene2.destroy();
        controller.destroy();
      },
    },
  ],
  transitions: [
    {
      leave(current, next) {
        let done = this.async();
        const tl = gsap.timeline({
          defaults: {
            ease: "power2.inOut",
          },
        });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".layer",
          0.75,
          { clip: "rect(0 0vw 0vh 0)" },
          { clip: "rect(0 100vw 100vh 0)", stagger: 0.25, onComplete: done },
          "-=0.5"
        );
      },
      enter(current, next) {
        let done = this.async();
        const tl2 = gsap.timeline({
          defaults: {
            ease: "power2.inOut",
          },
        });
        tl2.fromTo(
          ".layer",
          1,
          { clip: "rect(0 100vw 100vh 0)" },
          { clip: "rect(100vh 100vw 100vh 100vw)" }
        );
        tl2.fromTo(
          current.container,
          1,
          { opacity: 0 },
          { opacity: 1, onComplete: done },
          "-=2"
        );
      },
    },
  ],
});

const curs = document.querySelector(".cursor");
function cursor(e) {
  curs.style.top = e.pageY + "px";
  curs.style.left = e.pageX + "px";
}

window.addEventListener("mousemove", cursor);
