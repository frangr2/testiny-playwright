import axios, { AxiosInstance } from 'axios';
import { TestCase } from '../types/TestCase';
import { TestPlanQuery, TestPlanResponse } from '../types/TestPlan';
import dotenv from 'dotenv';
import { TestRunQuery } from '../types/TestRun';

dotenv.config();

export class TestinyAPIClient {
    private apiKey: string;
    private client: AxiosInstance;

    constructor() {
        this.apiKey = process.env.TESTINY_API_KEY || '';
        if (!this.apiKey) {
            throw new Error(
                'TESTINY_API_KEY is not defined in the environment variables.'
            );
        }

        this.client = axios.create({
            baseURL: 'https://app.testiny.io/api/v1',
            headers: {
                'X-Api-Key': `${this.apiKey}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    async getTestCase(testCaseId: number): Promise<TestCase> {
        const response = await this.client.get<TestCase>(
            `/testcase/${testCaseId}`
        );
        return response.data;
    }

    async getTestCasesByTestPlan(testPlanId: number): Promise<TestCase[]> {
        const queryParam: TestPlanQuery = {
            id: testPlanId,
            idOnly: true,
            includeTotalCount: true,
            map: [
                {
                    entities: ['testcase', 'testcase_folder'],
                    optional: true,
                    result: 'testcase_folder',
                },
            ],
            order: [
                {
                    column: 'testcase_folder.id',
                    order: 'seq',
                    seq: [0, -1, -2],
                },
            ],
        };
        const response = await this.client.get<TestPlanResponse>(`/testcase`, {
            params: JSON.stringify(queryParam),
        });

        const ids = response.data.data.map((item) => item.id);
        const testCases = await Promise.all(
            ids.map((id) => this.getTestCase(id))
        );

        return testCases;
    }

    async updateTestCaseFromTestRun(data: TestRunQuery[]) {
        await this.client.post(
            '/testrun/mapping/bulk/testcase:testrun?op=update',
            JSON.stringify(data)
        );
    }
}

export default TestinyAPIClient;
