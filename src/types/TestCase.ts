export interface TestCase {
    id: number;
    title: string;

    sort_index?: number;
    is_deleted?: boolean;
    created_at?: string;
    created_by?: number;
    modified_at?: string;
    modified_by?: number;
    deleted_at?: string | null;
    deleted_by?: number | null;
    _etag?: string;
    project_id?: number;
    owner_user_id?: number;
    $owner_name?: string;
    type?: string;
    template?: string;
    precondition_text?: any;
    content_text?: any;
    steps_text?: string;
    expected_result_text?: string;
    priority?: number;
    status?: string;
    testcase_type?: string;
    automation?: string;
    estimate?: number;
}
