import { DataTable } from '@/components/table/data-table';

export default function Home() {
    return (
        <div className="container p-20">
            <h2 className="my-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Data Table
            </h2>
            <div>
                <DataTable />
            </div>
        </div>
    );
}
