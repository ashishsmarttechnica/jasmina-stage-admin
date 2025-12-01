import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomPagination from "../../../components/CustomPagination";
import { getAllCompanyTransaction } from "../../../redux/actions/TransactionAction";
import { AgGridReact } from 'ag-grid-react';
import { Skeleton } from '@mui/material';
import { format } from 'date-fns';


const ComapanyTransaction = ({ id }) => {
    const themeMode = useSelector((state) => state?.themeMode?.colorMode);
    const adminData = useSelector((state) => state.loginUser);
    const [search, setSearch] = useState('');
    const [debounceTimer, setDebounceTimer] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getRowHeight = (params) => (params.node.group ? 10 : 80);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const { data, loading } = useSelector(
        (state) => state?.TransactionReducerDetails,
    );
    console.log(data);
    const searchMyData = () => {
        try {
            if (search.trim()) {
                dispatch(getAllCompanyTransaction(id));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        if (search !== '') {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
            const timer = setTimeout(() => {
                searchMyData();
            }, 400);
            setDebounceTimer(timer);
            return () => {
                clearTimeout(timer);
            };
        } else {
            dispatch(getAllCompanyTransaction(id));
        }
    }, [search]);

    // #region set column data
    const columns = [
        {
            field: 'title',
            headerName: 'Plan Title',
            width: 250,
            cellRenderer: (params) => {
                const searchTerm = search.trim().toLowerCase();
                const title = params?.data.title || '';

                if (searchTerm && title.toLowerCase().includes(searchTerm)) {
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    const highlightedTitle = title.replace(
                        regex,
                        `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`,
                    );

                    return <div dangerouslySetInnerHTML={{ __html: highlightedTitle }} />;
                }

                return <div>{title}  </div>;
            },
        },
        {
            field: 'transactionId',
            headerName: 'Transaction ID',
            flex: 1,
        },

        {
            field: 'price',
            headerName: 'Price',
            width: 120,
            cellRenderer: (params) => (
                <p>${params?.data.price}</p>
            ),
        },
        {
            field: 'payment_status',
            headerName: 'Payment Status',
            width: 150,
            cellRenderer: (params) => (
                <div className="flex h-full items-center">
                    <span className={`inline-flex rounded-full border py-1 px-3 text-sm font-medium ${params.data?.payment_status === 'success'
                            ? 'border-[#3CA745] text-[#3CA745]'
                            : 'border-[#DC3545] text-[#DC3545]'
                        }`}>
                        {params.data?.payment_status}
                    </span>
                </div>
            ),
        },
        {
            field: 'purchase_date',
            headerName: 'Purchase Date',
            width: 180,
            cellRenderer: (params) => (
                <div>
                    {params.data?.purchase_date ? format(new Date(params.data.purchase_date), 'MMM dd, yyyy') : ''}
                </div>
            ),
        },
        {
            field: 'expire_date',
            headerName: 'Expiry Date',
            width: 180,
            cellRenderer: (params) => (
                <div>
                    {params.data?.expire_date ? format(new Date(params.data.expire_date), 'MMM dd, yyyy') : ''}
                </div>
            ),
        },

    ];

    const columnsLoad = [
        {
            headerName: 'Transaction ID',
            width: 150,
            cellRenderer: () => <Skeleton />,
        },
        {
            headerName: 'Plan Title',
            flex: 1,
            cellRenderer: () => <Skeleton />,
        },
        {
            headerName: 'Price',
            width: 120,
            cellRenderer: () => <Skeleton />,
        },
        {
            headerName: 'Payment Status',
            width: 130,
            cellRenderer: () => <Skeleton />,
        },
        {
            headerName: 'Purchase Date',
            width: 150,
            cellRenderer: () => <Skeleton />,
        },
        {
            headerName: 'Expiry Date',
            width: 150,
            cellRenderer: () => <Skeleton />,
        },

    ];
    // #endregion set column data
    return (
        <>
            <div className="rounded-sm   dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow shadow-lg"></div>

            <div className="rounded-sm shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
                <div className="flex flex-col">
                    <div
                        className={`${themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'
                            } `}
                    >
                        <AgGridReact
                            rowData={
                                loading ? Array(limit).fill({}) : data?.data || []
                            }
                            className="relative"
                            style={{ width: '100%', height: '100%' }}
                            columnDefs={loading ? columnsLoad : columns}
                            defaultColDef={{ resizable: true, minWidth: 200 }}
                            animateRows={true}
                            getRowHeight={getRowHeight}
                            onGridReady={(params) => {
                                params.api.sizeColumnsToFit();
                            }}
                        />
                    </div>
                </div>

                {/* <div className="flex items-center justify-end">
                    <CustomPagination
                        page={page}
                        limit={limit}
                        setPage={setPage}
                        setLimit={setLimit}
                        count={data?.total || 0}

                    />
                </div> */}
            </div>
        </>
    );
};

export default ComapanyTransaction; 