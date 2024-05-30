import {
  baseComponents,
  provideDesignSystem,
  rapidIcon,
  rapidButton,
  rapidCard,
  rapidTabs,
  rapidTab,
  rapidTabPanel,
  rapidTextField,
  rapidTextArea,
  rapidRadioGroup,
  rapidRadio,
  rapidToast,
} from '@genesislcap/rapid-design-system';
import { rapidGridComponents } from '@genesislcap/rapid-grid-pro';

/**
 * @public
 */
export const registerCommonRapidComponents = async () => {
  /**
   * Register the components the app is using with the system.
   */
  provideDesignSystem()
      .register(
          /**
           * Common across most routes, so batch register these lightweight components upfront.
           */
          rapidIcon(),
          rapidButton(),
          rapidCard(),
          rapidTabs(),
          rapidTab(),
          rapidTabPanel(),
          rapidTextField(),
          rapidTextArea(),
          rapidRadioGroup(),
          rapidRadio(),
          rapidToast(),
          /**
           * A re-export of designSystemProvider is missing from the top level index file in rapid
           */
          baseComponents.designSystemProvider(),
          rapidGridComponents,
      );
};
