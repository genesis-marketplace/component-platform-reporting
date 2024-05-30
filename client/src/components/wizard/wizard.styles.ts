import { css } from '@genesislcap/web-core';
import { helperStyles, normalizeStyles } from '../../styles';
import { radioGroupTag, radioTag, textAreaTag } from '../../tags';

export const WizardStyles = css`
  ${normalizeStyles}
  ${helperStyles}
  :host {
    width: 100%;
  }

  .grid-container {
    display: grid;
    gap: calc(var(--design-unit) * 4px);
    grid-template-columns: minmax(250px, 10%) 1fr;
    grid-auto-rows: 1fr;
    margin: calc(var(--design-unit) *4px) 0;
    height: 95%;
  }

  .nav {
    max-width: 248px;
    background-color: var(--neutral-layer-2);
  }

  .nav-item h5 {
    position: relative;
    padding: calc(var(--design-unit) * 2px) calc(var(--design-unit) *4px);
    margin-left: calc(var(--design-unit) * -4px);
    margin-right: calc(var(--design-unit) * -4px);
    margin-bottom: 0;
    vertical-align: middle;
    color: var(--neutral-foreground-hint);
  }

  .nav-item.active h5,
  .nav-item h5:hover {
    color: var(--neutral-foreground-rest);
    background-color: var(--neutral-fill-stealth-rest);
  }

  .nav-item.active h5::after {
    content: ' ';
    width: 5px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    --primary-gradient-angle: -172.6004deg;

    background-image: linear-gradient(
      var(--primary-gradient-angle),
      var(--accent-fill-rest) 0%,
      rgb(101 77 249 / 97%) 100%
    );
    box-sizing: border-box;
  }

  .nav-item .step-number {
    display: inline-block;
    width: calc(var(--base-height-multiplier)* 2px);
    height: calc(var(--base-height-multiplier) * 2px);
    vertical-align: middle;
    text-align: center;
    font-family: var(--body-font);
    font-size: var(--type-ramp-minus-2-font-size);
    line-height: var(--type-ramp-minus-2-line-height);
    color: var(--neutral-fill-stealth-hover);
    border-radius: 50%;
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-foreground-hint);
  }

  .nav-item.active .step-number,
  .nav-item h5:hover .step-number {
    color: var(--neutral-foreground-hint);
    border-color: var(--neutral-foreground-hint);
  }

  .nav-item .step-number.completed {
    border-color: var(--success-color);
    background-color: var(--success-color);
  }

  .body {
    background-color: var(--neutral-layer-4);
    padding-left: 0;
    padding-top: 0;
    box-shadow: none;
  }

  .description {
    color: var(--neutral-foreground-hint);
    font-size: var(--type-ramp-minus-2-font-size);
    font-weight: 700;
    line-height: normal;
    margin-left: calc((var(--design-unit) + 1) * 6px);
  }

  .divider {
    margin: calc(var(--design-unit) * 4px) 0;
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-rest);
  }

  .nav-line.completed {
    margin: calc(var(--design-unit) * 1px) 0 calc(var(--design-unit) * 1px) calc(var(--design-unit) * 2px);
    border-left: calc(var(--stroke-width) * 2px) solid var(--success-color);
  }

  .context-container {
    gap: calc(var(--design-unit) * 3px);
  }

  .completed .context-container {
    padding: calc(var(--design-unit) * 2px) 0 calc(var(--design-unit) * 4px);
  }

  .context {
    color: var(--neutral-foreground-hint);
    font-size: calc(var(--type-ramp-minus-2-font-size) - 1px);
    font-weight: 700;
    line-height: calc(var(--type-ramp-minus-2-line-height) - calc(var(--design-unit) * 1px));
    max-height: 100px;
    margin: 0 0 0 calc(var(--design-unit) * 5px);
    overflow: auto;
  }

  .context b {
    color: var(--neutral-foreground-rest);
  }

  .label {
    font-size: var(--type-ramp-minus-1-font-size);
    color: var(--neutral-foreground-hint);
    margin-bottom: calc(var(--design-unit) * 1px);
  }

  ${radioGroupTag}::part(positioning-region) {
    display: flex;
    flex-direction: column;
    gap: calc(var(--design-unit) * 2px);
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    ${radioGroupTag}::part(positioning-region) {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .radio-button {
    background-color: var(--neutral-layer-2);
    border-radius: calc((var(--control-corner-radius) - 2) * 1px);
    cursor: pointer;
    height: 42px;
    margin: 0;
    padding: 0 calc(var(--design-unit) * 2px);
  }

  .radio-button::part(label) {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .radio-button.active,
  .radio-button:hover {
    background-color: var(--neutral-layer-1);
  }

  ${radioTag}:hover::part(control) {
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-foreground-rest);
  }

  .arrow {
    align-self: center;
    justify-self: center;
  }

  ${textAreaTag}::part(control) {
    min-height: 170px;
  }

  .report-details,
  .data-sources {
    height: 100%;
  }

  .radio-buttons {
    max-height: 560px;
    overflow: auto;
  }
`;
