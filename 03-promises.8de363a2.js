!function(){var e=document.querySelector(".form");function n(e,n){return new Promise((function(t,o){setTimeout((function(){Math.random()>.3?t({position:e,delay:n}):o({position:e,delay:n})}),n)}))}e.addEventListener("submit",(function(t){t.preventDefault();parseInt(e.elements.delay.value,10);var o=parseInt(e.elements.step.value,10);!function(e,t){for(var o=t,a=1;a<=e;a++)n(a,o).then((function(e){var n=e.position,t=e.delay;console.log("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"))})).catch((function(e){var n=e.position,t=e.delay;console.log("❌ Rejected promise ".concat(n," in ").concat(t,"ms"))})),o+=t}(parseInt(e.elements.amount.value,10),o)}))}();
//# sourceMappingURL=03-promises.8de363a2.js.map
