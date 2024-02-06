import { h, Component, Prop, ComponentInterface, Element, Host } from '@stencil/core';

@Component({
  tag: 'stencil-test',
  styleUrl: 'stencil-test.scss',
  shadow: false,
  scoped: true,
})
export class StencilTest implements ComponentInterface {
  @Element() hostElement: HTMLElement;

  /***/
  @Prop({ reflect: true }) hideDefaultSlot?: boolean;

  /***/
  @Prop({ reflect: true }) hideSuffixSlot?: boolean;

  /***/
  @Prop({ reflect: true }) wrapper?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'pre' | 'strong' | 'em' = 'h3';

  render(): HTMLElement {
    const TagName = this.wrapper || 'span';

    console.log('hideDefaultSlot:', this.hideDefaultSlot);
    console.log('hideSuffixSlot:', this.hideSuffixSlot);
    console.log('TagName:', TagName);

    return (
      <Host>
        <slot
          name="prefix"
          ref={el => {
            console.log('prefix slot ref:', el);
          }}
        />
        <div class="content-wrapper">
          <TagName>
            <slot name="title" />
          </TagName>
          {!this.hideDefaultSlot ? <slot>Slot fallback</slot> : null}
        </div>

        {!this.hideSuffixSlot ? <slot name="suffix" /> : null}
      </Host>
    );
  }
}
