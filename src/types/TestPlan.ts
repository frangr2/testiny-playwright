export interface TestPlanQuery {
    id: number;
    idOnly: boolean;
    includeTotalCount: boolean;
    map: Array<{
        entities: string[];
        optional: boolean;
        result: string;
    }>;
    order: Array<{
        column: string;
        order: string;
        seq: number[];
    }>;
}

export interface TestPlanResponse {
    meta: {
        offset: number;
        count: number;
        totalCount: number;
    };
    data: {
        id: number;
        testcase_folder: string | null;
    }[];
}
