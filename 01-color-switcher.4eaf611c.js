!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),o=null,n=!1;t.addEventListener("click",(function(){n||(n=!0,t.disabled=!0,o=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}),1e3))})),e.addEventListener("click",(function(){n&&(clearInterval(o),n=!1,t.disabled=!1,console.log("Interval with id ".concat(o," has stopped!")))})),console.log()}();
//# sourceMappingURL=01-color-switcher.4eaf611c.js.map
