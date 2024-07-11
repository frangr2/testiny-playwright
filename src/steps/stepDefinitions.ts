// src/steps/stepDefinitions.ts
import { Page } from 'playwright';
import { GoogleActions } from '../actions/google.aom';

type StepFunction = (page: Page) => Promise<void>;

interface StepDefinitions {
  [step: string]: StepFunction;
}

export const steps: StepDefinitions = {
  'Usuario accede al buscador de Google': async (page: Page) => {
    const googleActions = new GoogleActions(page);
    await googleActions.goto();
  },
  "Busca 'Playwright' en el buscador": async (page: Page) => {
    const googleActions = new GoogleActions(page);
    await googleActions.searchFor('Playwright');
  },
  'Accede al primer resultado': async (page: Page) => {
    const googleActions = new GoogleActions(page);
    await googleActions.clickFirstResult();
  },
  'El primer resultado es el sitio oficial de Playwright': async (page: Page) => {
    const googleActions = new GoogleActions(page);
    await googleActions.verifyTitleContains('Playwright');
  }
};

export function getStepFunction(step: string): StepFunction {
  const stepFunction = steps[step];
  if (!stepFunction) {
    throw new Error(`Step '${step}' is not defined`);
  }
  return stepFunction;
}
