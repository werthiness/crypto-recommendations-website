const slide_to_text = {
1: "1 M",
2: "10 M",
3: "100 M",
4: "1 B",
5: "10B",
6: "100B",
7: "1T"
};

const text_to_slide = {
"1 M": 1,
"10 M": 2,
"100 M": 3,
"1 B": 4,
"10B": 5,
"100B": 6,
"1T": 7
};

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#8dc3e1', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = slide_to_text[to];
    } else {
        fromSlider.value = from;
    }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#8dc3e1', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = slide_to_text[to];
    } else {
        toInput.value = slide_to_text[from];
    }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#8dc3e1', toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = slide_to_text[to];
    document.getElementById("left_obscure").style.width = 5 + (from-1) * 27 + "px";
  } else {
    fromInput.value = slide_to_text[from];
    document.getElementById("left_obscure").style.width = 5 + (from-1) * 27 + "px";
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#8dc3e1', toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = slide_to_text[to];
    document.getElementById("right_obscure").style.width = (7 - to) * 27 + "px";
  } else {
    toInput.value = slide_to_text[from];
    toSlider.value = from;
    document.getElementById("right_obscure").style.width = (7 - to) * 27 + "px";
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%,
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%,
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= 0 ) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#8dc3e1', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
//fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
//toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
