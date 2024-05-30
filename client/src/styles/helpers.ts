import { css } from "@genesislcap/web-core";

/**
 * Helper classes
 */
export const helperStyles = css`
  ::-webkit-scrollbar {
    width: calc((var(--base-height-multiplier) + var(--design-unit)) * 1px);
  }

  ::-webkit-scrollbar-track {
    background: var(--neutral-layer-1);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--neutral-fill-rest);
  }
  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-left {
    text-align: left;
  }

  .my-20 {
    margin-top: calc(var(--design-unit) * 5px);
    margin-bottom: calc(var(--design-unit) * 5px);
  }

  .h-full {
    height: 100%;
  }

  .h-90pc {
    height: 90%;
  }

  .w-full {
    width: 100%;
  }

  .max-w-50pc {
    max-width: 50%;
  }

  .max-w-360px {
    max-width: 360px;
  }

  .flex {
    display: flex;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-1 {
    flex: 1;
  }

  .space-between {
    justify-content: space-between;
  }

  .flex-end {
    justify-content: flex-end;
  }

  .items-center {
    align-items: center;
  }

  .gap-1 {
    gap: calc(var(--design-unit) * 4px);
  }

  .gap-2 {
    gap: 2rem;
  }

  .gap-3 {
    gap: 3rem;
  }

  .gap-4 {
    gap: 4rem;
  }

  .mt-1 {
    margin-top: calc(var(--design-unit) * 4px);
  }

  .mt-15px {
    margin-top: calc(var(--design-unit) * 4px);
  }

  .mt-2 {
    margin-top: 2rem;
  }

  .ml-5px {
    margin-left: 5px;
  }

  .mr-5px {
    margin-right: 5px;
  }

  .p-2 {
    padding: 0.625rem;
  }

  .card {
    padding: calc(var(--design-unit) * 4px);
    width: 100%;
    background-color: var(--neutral-layer-3);
    border: none;
  }

  .overflow-auto {
    overflow: auto;
  }

  .section-title {
    font-size: var(--type-ramp-plus-4-font-size);
    font-weight: 700;
    line-height: normal;
  }

  .card-title {
    color: var(--neutral-foreground-rest);
    font-size: var(--type-ramp-base-font-size);
    font-weight: 700;
    line-height: normal;
    margin-top: 0;
    text-align: "left";
  }

  .step-title {
    font-size: var(--type-ramp-base-font-size);
    line-height: 22px;
  }

  .card-description {
    color: var(--neutral-foreground-hint);
    line-height: normal;
    font-size: var(--type-ramp-base-font-size);
    font-weight: 700;
  }

  .spacer-3 {
    height: 1.3rem;
    margin: calc(var(--design-unit) * 4px) 0 calc(var(--design-unit) * 4px);
  }

  .light-grey {
    color: var(--neutral-foreground-rest);
  }

  .dark-grey {
    color: var(--neutral-foreground-hint);
  }
`;
