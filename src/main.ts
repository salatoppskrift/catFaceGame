import './style.css'

class Fifish extends HTMLElement {
  private bbool = true;

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
    this.addEventListener("click", () => {
      this.bbool = !this.bbool;
      this.render();
    })
  }
}

customElements.define("fi-fish", Fifish);

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = /*HTML*/`
  <fi-fish></fi-fish>
`;