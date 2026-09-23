import './style.css'
import type { CatFace } from './types/CatFace';

class CatFaceElement extends HTMLElement {
  private bbool = false;
  private num = 0;
  private catFaces: CatFace[] = [
    {
      str: "joy",
      emoji: "😹"
    },
    {
      str: "angry",
      emoji: "😾"
    },
    {
      str: "sad",
      emoji: "😿"
    },
    {
      str: "happy",
      emoji: "😸"
    },
    {
      str: "smug",
      emoji: "😼"
    },
    {
      str: "love",
      emoji: "😻"
    },
    {
      str: "shock",
      emoji: "🙀"
    }
  ];

  constructor() {
    super();
  }
  connectedCallback(): void {
    this.render();
  }
  private render() {
    this.innerHTML = /*HTML*/`
      <button>
        A fiiissssh ${this.bbool}
      </button>
    `;
    this.querySelector("button")!.addEventListener("click", () => {
      this.bbool = !this.bbool;
      console.log(++this.num, this.bbool);
      this.render();
    })
  }
}

customElements.define("fi-fish", CatFaceElement);

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = /*HTML*/`
  <fi-fish></fi-fish>
`;