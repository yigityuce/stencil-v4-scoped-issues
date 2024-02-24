import { h, Component, ComponentInterface, Element, Host } from '@stencil/core';

@Component({
  tag: 'stencil-nested-test',
  styleUrl: 'stencil-nested-test.scss',
  shadow: false,
  scoped: true,
})
export class StencilNestedTest implements ComponentInterface {
  @Element() hostElement: HTMLElement;

  render(): HTMLElement {
    return (
      <Host>
        <slot name="prefix" />

        <div class="content-wrapper">
          <dummy-wrapper id="dw-before-title">Nested Custom Component</dummy-wrapper>
          <h2>
            <slot name="title" />
          </h2>
          <dummy-wrapper id="dw-level-1">
            <dummy-wrapper id="dw-level-2">
              <slot />
            </dummy-wrapper>
          </dummy-wrapper>
        </div>

        <slot name="suffix" />
      </Host>
    );
  }
}
