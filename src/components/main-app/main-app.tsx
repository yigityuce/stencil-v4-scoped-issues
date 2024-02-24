import { h, Component, ComponentInterface, Host, State } from '@stencil/core';

const DEFAULT_ITEM_COUNT = 4;
const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

@Component({
  tag: 'main-app',
  styleUrl: 'main-app.scss',
  shadow: false,
  scoped: true,
})
export class MainApp implements ComponentInterface {
  @State() titleTag: HTMLStencilTestElement['wrapper'] = 'h2';
  @State() hideSuffixSlot: HTMLStencilTestElement['hideSuffixSlot'] = false;
  @State() hideDefaultSlot: HTMLStencilTestElement['hideDefaultSlot'] = false;
  @State() testItems: HTMLElement[] = [];
  @State() testItems2: HTMLElement[] = [];
  @State() dynamicTestItems: HTMLElement[] = [];

  private nestedTestExampleRef: HTMLStencilNestedTestElement;
  private textContentExampleRef: HTMLStencilTestElement;
  private innerTextExampleRef: HTMLStencilTestElement;

  componentWillLoad(): void | Promise<void> {
    this.testItems = this.createTestVNodes();
    this.testItems2 = this.createTestVNodes();
    this.dynamicTestItems = this.createTestVNodes();
  }

  private createTestVNodes = (count = DEFAULT_ITEM_COUNT, shuffle = false): HTMLElement[] => {
    const items = Array.from(new Array(count)).map((_, i) => <span class="default-slot-item">{`item-${i}`}</span>);
    return shuffle ? items.sort(() => Math.random() - 0.5) : items;
  };

  private createTestElements = (count = DEFAULT_ITEM_COUNT, shuffle = false): HTMLElement[] => {
    const items = Array.from(new Array(count)).map((_, i) => {
      const element = document.createElement('span');
      element.className = 'default-slot-item';
      element.textContent = `item-${i}`;
      return element;
    });
    return shuffle ? items.sort(() => Math.random() - 0.5) : items;
  };

  render(): HTMLElement {
    return (
      <Host>
        <div class="example">
          <h2 class="title">Dynamic Tag Example</h2>
          <div class="content">
            <stencil-test wrapper={this.titleTag}>
              <span slot="prefix">PRE</span>
              <span slot="suffix">SUF</span>
              <span slot="title">Title</span>
              {this.testItems}
            </stencil-test>
            <select
              onChange={e => {
                this.titleTag = (e.target as HTMLSelectElement).value as HTMLStencilTestElement['wrapper'];
              }}
            >
              <option value="h1" selected={this.titleTag === 'h1'}>
                H1
              </option>
              <option value="h2" selected={this.titleTag === 'h2'}>
                H2
              </option>
              <option value="h3" selected={this.titleTag === 'h3'}>
                H3
              </option>
            </select>
          </div>
        </div>

        <div class="example">
          <h2 class="title">Dynamic Sibling Children Example</h2>
          <div class="content">
            <stencil-test>
              <span slot="prefix">PRE</span>
              <span slot="suffix">SUF</span>
              <span slot="title">Title</span>
              {this.dynamicTestItems}
            </stencil-test>
            <button onClick={() => (this.dynamicTestItems = this.createTestVNodes(DEFAULT_ITEM_COUNT, true))}>Shuffle Items</button>
          </div>
        </div>

        <div class="example">
          <h2 class="title">Nested Relocated & Dynamic Sibling Children Example</h2>
          <div class="content">
            <stencil-nested-test ref={el => (this.nestedTestExampleRef = el)}>
              <strong slot="prefix">PRE</strong>
              <span slot="suffix">SUF</span>
              <span slot="title">Title</span>
              {this.dynamicTestItems}
            </stencil-nested-test>
            <button
              onClick={() => {
                const items = Array.from(this.nestedTestExampleRef?.querySelectorAll('.default-slot-item') || []);
                for (let i = 0; i < items.length; i++) {
                  items[i].remove();
                }
                for (const item of this.createTestElements(getRandomInt(1, 20))) {
                  this.nestedTestExampleRef?.appendChild(item);
                }
              }}
            >
              Randomize Item Count
            </button>
          </div>
        </div>

        <div class="example">
          <h2 class="title">Conditional Rendering (Suffix Slot)</h2>
          <div class="content">
            <stencil-test hideSuffixSlot={this.hideSuffixSlot}>
              <span slot="prefix">PRE</span>
              <span slot="suffix">SUF</span>
              <span slot="title">Title</span>
              {this.testItems}
            </stencil-test>
            <button onClick={() => (this.hideSuffixSlot = !this.hideSuffixSlot)}>Toggle Suffix Visibility</button>
          </div>
        </div>

        <div class="example">
          <h2 class="title">Conditional Rendering (Default Slot) & Slot Fallback Example</h2>
          <div class="content">
            <stencil-test hideDefaultSlot={this.hideDefaultSlot}>
              <span slot="prefix">PRE</span>
              <span slot="suffix">SUF</span>
              <span slot="title">Title</span>
              {this.testItems2}
            </stencil-test>
            <button onClick={() => (this.hideDefaultSlot = !this.hideDefaultSlot)}>Toggle Default Slot(s) Visibility</button>
          </div>
        </div>

        <div class="example">
          <h2 class="title">Update "textContent" Example</h2>
          <div class="content">
            <stencil-test ref={el => (this.textContentExampleRef = el)}>
              <span slot="prefix">PRE</span>
              <span slot="suffix">SUF</span>
              <span slot="title">Title</span>
              <pre>Line 1</pre>
              <pre>Line 2</pre>
              <pre>Line 3</pre>
              <pre>Line 4</pre>
            </stencil-test>
            <button onClick={() => this.textContentExampleRef && (this.textContentExampleRef.textContent = `${Date.now()}`)}>Update Text Content</button>
          </div>
        </div>

        <div class="example">
          <h2 class="title">Update "innerText" Example</h2>
          <div class="content">
            <stencil-test ref={el => (this.innerTextExampleRef = el)}>
              <span slot="prefix">PRE</span>
              <span slot="suffix">SUF</span>
              <span slot="title">Title</span>
              <pre>Hello World!</pre>
            </stencil-test>
            <button onClick={() => this.innerTextExampleRef && (this.innerTextExampleRef.innerText = `${Date.now()}`)}>Update Inner Text</button>
          </div>
        </div>
      </Host>
    );
  }
}
