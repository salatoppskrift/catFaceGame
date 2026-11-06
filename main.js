const app = document.getElementById("app");
const catFaceTemplate = {
  joy: "😹",
  angry: "😾",
  sad: "😿",
  happy: "😸",
  smug: "😼",
  love: "😻",
  shock: "🙀"
};
const catFaces = {
  html: () => Object.values(document.getElementsByClassName("catFace")),
  arr: Object.values(catFaceTemplate)
};

updateView(7)(catFaces.arr);

function updateView(howManyKitties) {
  return (catFacesArr) => {
    app.innerHTML = "";
    document.getElementById("ed").innerHTML = "";
    const annerkjennelse = document.createElement("p");
    annerkjennelse.innerHTML = `Lydkilde: tiktok@sirarthurmeows`;
    const faces = catFacesArr;

    Array.from({ length: howManyKitties }, (_, i) => {
      const divEl = document.createElement("div");
      const buttEl = document.createElement("button");

      divEl.style.animationDelay = `calc(${-0.6 * i}s)`;
      buttEl.innerHTML = randomise(faces, Math.random);
      buttEl.setAttribute("class", "catFace");
      divEl.addEventListener("click", function () {
        buttEl.innerHTML = randomise(faces, Math.random);
        new Sound("./sounds/meow.mp3").play();
      });
      divEl.addEventListener("click", checkFaces);
      divEl.append(buttEl);
      return { div: divEl };
    }).map(
      divObj => app.append(divObj.div)
    );
    app.append(annerkjennelse);
    if (
      catFaces.html().map(catFace => catFace.innerHTML).every((bool, _, arr) => bool === arr[0])
    ) updateView(catFacesArr);
  }
}

function checkFaces() {
  const catFaceHtml = catFaces.html();
  if (catFaceHtml.every((face, _, arr) => face.innerHTML === arr[0].innerHTML)) {
    const section = document.createElement("section");
    section.className = "grattis";
    section.innerHTML = `
        <h2>Gratulerer!</h2>
        <p>Alle ansikter matcher!</p>${specificEmotionPrize(catFaceHtml[0].innerHTML, catFaceTemplate)
      }`;

    catFaceHtml.map(face => {
      if (face instanceof HTMLButtonElement) {
        face.disabled = true;
        face.style.cursor = "not-allowed";
      }
    })

    const btn = document.createElement("button");
    btn.innerHTML = "Start på nytt?";
    btn.addEventListener("click", () => { updateView(catFaces.arr) });
    section.append(btn);
    document.getElementById("ed").append(section);
  }
}

function specificEmotionPrize(face, template) {
  return Array.from({ length: 1 }, (() => {
    switch (face) {
      case template.joy:
        return "De har latterkrampe!!";
      case template.angry:
        return "Oi, så sinna...";
      case template.sad:
        return "Det er ikke et tørt øye i tomrommet.";
      case template.happy:
        return "Lykken er her!";
      case template.smug:
        return "De har onde planer og de involverer deg.";
      case template.love:
        return "En gjeng med katter er storforelsket i deg.";
      case template.shock:
        return "SJOKK!";
      default: "(Hvordan havnet No-Face fra Chihiro og Heksene her..?)";
    }
  })()).map(sentence => `<p>${sentence}</p>`).join("");
}

function randomise(strArr, func) {
  try {
    if (!Array.isArray(strArr) || !(func instanceof Function))
      throw [Array.isArray(strArr), func instanceof Function];

    return strArr[Math.floor(func() * strArr.length)];
  } catch (err) {
    console.log(`En eller flere av parametre ${err} er noe manglende.`);
  }
}

function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}