import { h, Component, ComponentInterface, Host } from '@stencil/core';

@Component({
  tag: 'dummy-wrapper',
  styleUrl: 'dummy-wrapper.scss',
  shadow: false,
  scoped: true,
})
export class DummyWrapper implements ComponentInterface {
  render(): HTMLElement {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
