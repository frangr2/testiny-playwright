export interface TestRunQuery {
    ids: {
        testcase_id: number;
        testrun_id: number;
    }
    mapped: {
        result_status: 'NOTRUN' | 'PASSED' | 'FAILED' | 'BLOCKED' | 'SKIPPED'
    };
}

