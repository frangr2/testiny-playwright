import { TestCase } from '../types/TestCase';

interface TestStep {
    when: string;
    then: string;
}

export class TestCaseUtils {
    static extractStepsFromTestCase(testCase: TestCase): TestStep[] {
        let contentText: any;
        let steps: TestStep[] = [];

        if (testCase.content_text) {
            contentText = JSON.parse(testCase.content_text);
            
            steps = contentText.c[0].children.map((row: any) => {
                return {
                    when: row.children[0].children[0].children[0].text,
                    then: row.children[1].children[0].children[0].text,
                };
            });
        }

        return steps;
    }
}
