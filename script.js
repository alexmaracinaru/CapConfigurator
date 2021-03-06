"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  console.log(feature);
  // TODO: Toggle feature in "model"
  features[feature] = !features[feature];

  if (features[feature]) {
    console.log(`Feature ${feature} is turned on!`);
    // If feature is (now) turned on:
    // - mark target as chosen (add class "chosen")
    target.classList.add("chosen");
    // - un-hide the feature-layer(s) in the #product-preview;
    document
      .querySelectorAll(`#product-preview [data-feature=${feature}]`)
      .forEach((image) => {
        image.classList.remove("hide");
      });
    // - create featureElement and append to #selected ul
    const featureElement = createFeatureElement(feature);
    document.querySelector("#selected ul").appendChild(featureElement);
    // - create FLIP-animation to animate featureElement from img in target, to
    //   its intended position. Do it with normal animation or transition class!
    // feature added

    // TODO: More code
  } else {
    console.log(`Feature ${feature} is turned off!`);
    // TODO: More code
    // Else - if the feature (became) turned off:
    // - no longer mark target as chosen
    target.classList.remove("chosen");
    // - hide the feature-layer(s) in the #product-preview
    document
      .querySelectorAll(`#product-preview [data-feature=${feature}]`)
      .forEach((image) => {
        image.classList.add("hide");
      });
    // - find the existing featureElement in #selected ul
    document.querySelector(`#selected ul [data-feature=${feature}]`).remove();
    // - create FLIP-animation to animate featureElement to img in target
    // - when animation is complete, remove featureElement from the DOM
    // feature removed
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
