import { Link, useLocation } from 'react-router-dom';
const Breadcrumb = ({ pageName }) => {
  const location = useLocation();

  return (
    <div className="mb-2 rounded border-stroke py-1.5 dark:border-strokedark px-2 border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-xl font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      {location.pathname !== 'user/details' && (
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/dashboard">
                Dashboard /
              </Link>
            </li>
            <li className="font-bold ">{pageName}</li>
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
