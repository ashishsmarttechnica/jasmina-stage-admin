import Breadcrumb from '../components/Breadcrumbs/Breadcrumb.jsx';
import TableOne from '../components/Tables/TableOne.jsx';
import TableThree from '../components/Tables/TableThree.jsx';
import TableTwo from '../components/Tables/TableTwo.jsx';
import DefaultLayout from '../layout/DefaultLayout.jsx';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
