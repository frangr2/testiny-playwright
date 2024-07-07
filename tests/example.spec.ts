import { test, chromium, Browser, Page } from '@playwright/test';
import { TestinyAPIClient } from '../src/api/testinyAPIClient';
import { TestCaseUtils } from '../src/utils/TestCaseUtils';
import { steps } from '../features/support/StepDefinitions';

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

    test('Get Test Cases from Test Plan', async () => {
        const apiClient = new TestinyAPIClient();
        const testPlanId = 1;
        const testCases = await apiClient.getTestCasesByTestPlan(testPlanId);
        testCases.map((item) => console.log(item.title));
    });

    test.only('Test from Testiny', async () => {
        const apiClient = new TestinyAPIClient();
        const testCaseId = 1;
        const testCase = await apiClient.getTestCase(testCaseId);
        const testCaseSteps = TestCaseUtils.extractStepsFromTestCase(testCase);

        // Mapea y ejecuta los steps
        try {
            for (const step of testCaseSteps) {
                if (step.when) {
                    const whenStep = steps[step.when];
                    if (whenStep) {
                        await whenStep(page);
                    } else {
                        console.error(`Paso 'when' no definido: ${step.when}`);
                        throw new Error(
                            `Paso 'when' no definido: ${step.when}`
                        );
                    }
                }
                if (step.then) {
                    const thenStep = steps[step.then];
                    if (thenStep) {
                        await thenStep(page);
                    } else {
                        console.error(`Paso 'then' no definido: ${step.then}`);
                        throw new Error(
                            `Paso 'then' no definido: ${step.then}`
                        );
                    }
                }
            }

            apiClient.updateTestCaseFromTestRun([
                {
                    ids: { testcase_id: testCaseId, testrun_id: 1 },
                    mapped: { result_status: 'PASSED' },
                },
            ]);
        } catch (err) {
            apiClient.updateTestCaseFromTestRun([
                {
                    ids: { testcase_id: testCaseId, testrun_id: 1 },
                    mapped: { result_status: 'FAILED' },
                },
            ]);
            throw err;
        }
    });
});
