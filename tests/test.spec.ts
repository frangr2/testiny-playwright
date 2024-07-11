// src/test/test.spec.ts
import { test, chromium, Browser, Page } from '@playwright/test';
import { TestinyAPIClient } from '../src/api/TestinyAPIClient';
import { TestCaseUtils } from '../src/utils/TestCaseUtils';
import { getStepFunction } from '../src/steps/StepDefinitions';  // Asegúrate de ajustar la ruta según tu estructura de archivos

let browser: Browser;
let page: Page;

test.describe('Google Search', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
    await browser.close();
  });

  test('Test from Testiny', async () => {
    try {
      // Obtén el test plan o test case desde Testiny
      const apiClient = new TestinyAPIClient();
      const testCaseId = 1;  // Reemplaza con el ID del test case que deseas ejecutar
      const testCase = await apiClient.getTestCase(testCaseId);
      const testCaseSteps = TestCaseUtils.extractStepsFromTestCase(testCase);
      console.log(testCaseSteps);

      // Mapea y ejecuta los pasos
      for (const step of testCaseSteps) {
        if (step.when) {
          const whenStepFunction = getStepFunction(step.when);
          await whenStepFunction(page);
        }
        if (step.then) {
          const thenStepFunction = getStepFunction(step.then);
          await thenStepFunction(page);
        }
      }
    } catch (error) {
      console.error('Error ejecutando el test case:', error);
      throw error;  // Propaga el error para que la prueba falle
    }
  });
});
