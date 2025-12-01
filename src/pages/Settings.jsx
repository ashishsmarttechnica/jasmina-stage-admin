import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSetting, updateSetting } from '../redux/actions/SettingAction';
import { toast } from 'react-toastify';

const Settings = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((s) => s?.settingReducerDetails || {});
  console.log(data);
  const [formData, setFormData] = useState({
    freeJob: '',
    adminEmail: '',
    socialLinks: {
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: '',
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    dispatch(getAllSetting());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFormData({
        freeJob: data?.freeJob || '',
        adminEmail: data?.adminEmail || '',
        socialLinks: {
          linkedin: data?.socialLinks?.linkedin || '',
          facebook: data?.socialLinks?.facebook || '',
          instagram: data?.socialLinks?.instagram || '',
          twitter: data?.socialLinks?.twitter || '',
        },
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.socialLinks) {
      setFormData((p) => ({ ...p, socialLinks: { ...p.socialLinks, [name]: value } }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!editMode) return; 
    dispatch(updateSetting(formData)).then((res) => {
      if (res?.success) {
        toast.success(res?.message || 'Setting saved');
        setEditMode(false);
        setIsEdited(false);
      } else if (res?.message) {
        toast.error(res?.message);
      }
    });
  };

  // if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{String(error)}</div>;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Global Settings</h3>
            </div>
            <div className="p-7">
              <form onSubmit={onSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/** helper: compute background class based on edit mode */}
                {(() => null)()}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">Auth Email</label>
                  <input
                    name="adminEmail"
                    value={formData.adminEmail}
                    disabled={!editMode}
                    onChange={handleChange}
                    className={`w-full rounded border border-stroke py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:text-white ${editMode ? 'bg-white dark:bg-white' : 'bg-gray dark:bg-meta-4'} dark:border-strokedark`}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">Free Job</label>
                  <input
                    name="freeJob"
                    value={formData.freeJob}
                    disabled={!editMode}
                    onChange={handleChange}
                    className={`w-full rounded border border-stroke py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:text-white ${editMode ? 'bg-white dark:bg-white' : 'bg-gray dark:bg-meta-4'} dark:border-strokedark`}
                  />
                </div>

                <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">X</label>
                    <input
                      name="twitter"
                      value={formData.socialLinks.twitter}
                      disabled={!editMode}
                      onChange={handleChange}
                      className={`w-full rounded border border-stroke py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:text-white ${editMode ? 'bg-white dark:bg-white' : 'bg-gray dark:bg-meta-4'} dark:border-strokedark`}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">Facebook</label>
                    <input
                      name="facebook"
                      value={formData.socialLinks.facebook}
                      disabled={!editMode}
                      onChange={handleChange}
                      className={`w-full rounded border border-stroke py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:text-white ${editMode ? 'bg-white dark:bg-white' : 'bg-gray dark:bg-meta-4'} dark:border-strokedark`}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">Instagram</label>
                    <input
                      name="instagram"
                      value={formData.socialLinks.instagram}
                      disabled={!editMode}
                      onChange={handleChange}
                      className={`w-full rounded border border-stroke py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:text-white ${editMode ? 'bg-white dark:bg-white' : 'bg-gray dark:bg-meta-4'} dark:border-strokedark`}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">LinkedIn</label>
                    <input
                      name="linkedin"
                      value={formData.socialLinks.linkedin}
                      disabled={!editMode}
                      onChange={handleChange}
                      className={`w-full rounded border border-stroke py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:text-white ${editMode ? 'bg-white dark:bg-white' : 'bg-gray dark:bg-meta-4'} dark:border-strokedark`}
                    />
                  </div>
                </div>

                <div className="xl:col-span-2 flex justify-end gap-4 mt-4">
                  {!isEdited && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(true);
                        setIsEdited(true);
                        toast.success('Edit mode enabled');
                      }}
                      className="flex justify-center rounded bg-blue-300 py-2 px-6 font-medium text-black hover:bg-blue-400"
                    >
                      Edit
                    </button>
                  )}
                  {isEdited && (
                    <button type="submit" className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90">Save</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
