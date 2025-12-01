import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConatacts, deleteContact } from '../../redux/actions/ContactAction';
import { Skeleton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableSearch from '../../components/TableSearch';
import CustomPagination from '../../components/CustomPagination';
import { FaTrash } from 'react-icons/fa';
import { MdVisibility } from 'react-icons/md';
import ContactMessageModal from '../../Model/ContactMessageModal';

const ContactUs = () => {
    const [search, setSearch] = useState('');
    const [lastserch, setLastSearch] = useState(false);
    const [debounceTimer, setDebounceTimer] = useState(null);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const themeMode = useSelector((state) => state?.themeMode?.colorMode);
    const dispatch = useDispatch();
    const { data, loading } = useSelector(
        (state) => state?.ContactReducerDetails,
    );
    const [open, setOpen] = useState(false);
    const [contactData, setContactData] = useState(null);
    console.log(data, "data");

    //#region  Get All Contacts
    useEffect(() => {
        dispatch(getAllConatacts('', page, limit));
    }, [page, limit]);

    useEffect(() => {
        if (search !== '') {
            setLastSearch(true);
            if (debounceTimer) clearTimeout(debounceTimer);
            const timer = setTimeout(() => {
                dispatch(getAllConatacts(search, page, limit));
            }, 400);
            setDebounceTimer(timer);
            return () => clearTimeout(timer);
        } else {
            if (lastserch) {
                dispatch(getAllConatacts('', page, limit));
                setLastSearch(false);
            }
        }
    }, [search]);
    //#endregion  Get All Contacts
    const handleDisc = (contact) => {
        setOpen(true);
        setContactData(contact);
      };
    //#region  Handle Delete Contact
    const handleDelete = (id) => {  
        console.log(id, "id");
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this contact?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteContact(id)).then((res) => {
                    if (res?.success) {
                        toast.success(res.message || "Contact deleted successfully");
                        dispatch(getAllConatacts(search, page, limit));
                    }
                    else {
                        toast.error(res.message || "Failed to delete contact");
                    }
                });
            }
        });
    };
    //#region  Set Columns for contactUS data
    const columns = [
        {
            headerName: 'NAME',
            field: 'name',
            flex: 1,
            cellRenderer: (params) => {
                const searchTerm = search.trim().toLowerCase();
                const title = params.data?.name || '';

                if (searchTerm && title.toLowerCase().includes(searchTerm)) {
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    const highlighted = title.replace(
                        regex,
                        `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`,
                    );
                    return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
                }

                return <div>{title}</div>;
            },
        },
        {
            headerName: 'EMAIL',
            field: 'email',
            flex: 1,
            cellRenderer: (params) => {
                const searchTerm = search.trim().toLowerCase();
                const title = params.data?.email || '';

                if (searchTerm && title.toLowerCase().includes(searchTerm)) {
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    const highlighted = title.replace(
                        regex,
                        `<span class='bg-[#ff0] text-black-2 rounded-[4px]'>$1</span>`,
                    );
                    return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
                }

                return <div>{title}</div>;
            },
        },
        {
            headerName: 'SUBJECT',
            field: 'subject',
            flex: 1,
            cellRenderer: (params) => <p>{params.data?.subject}</p>,
        },
        {
            headerName: 'MESSAGE',
            field: 'message',
            flex: 2,
            cellRenderer: (params) => <p>{params.data?.message}</p>,
        },
        {
            headerName: 'ACTION',
            width: 120,
            cellRenderer: (params) => (
                <div className="flex h-full items-center justify-start gap-4">
                    <div className="cursor-pointer rounded-full hover:bg-red-100 transition-transform duration-200 ease-in-out transform hover:scale-105">
                        <FaTrash
                            className="text-red-600 text-xl"
                            onClick={() => handleDelete(params.data?._id)}
                        />
                    </div>
                    <div
                      className="cursor-pointer p-1 bg-primary hover:bg-blue-800 rounded-[4px] hover:scale-105"
                      onClick={() => handleDisc(params.data)}
                    >
                      <MdVisibility className="text-[20px] text-white" />
                    </div>
                </div>
            ),
        },
    ];

    // Loading columns for skeletons
    const columnsLoad = [
        { headerName: 'NAME', flex: 1, cellRenderer: () => <Skeleton /> },
        { headerName: 'EMAIL', flex: 1, cellRenderer: () => <Skeleton /> },
        { headerName: 'SUBJECT', flex: 1, cellRenderer: () => <Skeleton /> },
        { headerName: 'MESSAGE', flex: 2, cellRenderer: () => <Skeleton /> },
        {
            headerName: 'ACTION',
            width: 120,
            cellRenderer: () => (
                <Skeleton variant="circular" width={24} height={24} />
            ),
        },
    ];

    //#endregion  Set Columns for contactUS data


    return (
        <DefaultLayout>
              <Breadcrumb pageName="Contact Us" />
              <div className="rounded-sm border border-b-0 border-stroke bg-white   shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow ">
                <header className=" flex  flex-col sm:flex-row justify-end items-center px-2 ">
                  <TableSearch search={search} setSearch={setSearch} />
                </header>
              </div>
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1 table_no_overflow">
                <div
                  className={`${
                    themeMode == 'dark' ? 'ag-theme-quartz-dark ' : 'ag-theme-quartz'
                  } `}
                  style={{ width: '100%', height: '100%' }}
                >
                  <AgGridReact
                    rowData={loading ? Array(limit).fill({}) : data?.contactUS || []}
                    columnDefs={loading ? columnsLoad : columns}
                    defaultColDef={{ resizable: true, minWidth: 200 }}
                    animateRows={true}
                    onGridReady={(params) => {
                      params.api.sizeColumnsToFit();
                    }}
                  />
                </div>
                {data?.total > 0 && (
                  <div className="flex items-center justify-end">
                    <CustomPagination
                      page={page}
                      limit={limit}
                      setPage={setPage}
                      setLimit={setLimit}
                      count={data?.total || 0}
                    />
                  </div>
                )}
              </div>
              
              {/* Contact Message Modal */}
              <ContactMessageModal
                open={open}
                onClose={() => setOpen(false)}
                contactData={contactData}
              />
            </DefaultLayout>
    )
}

export default ContactUs