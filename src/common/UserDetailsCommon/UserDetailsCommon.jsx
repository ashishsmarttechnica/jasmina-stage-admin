export const Info  = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <span className="text-indigo-500 mt-1">{icon}</span>
    <div>
      <span className="text-gray-600">{label}:</span>{' '}
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  </div>
);

export const Section = ({ title, children, icon }) => (
  <div className="pt-4 border-t">
    <h3 className="font-semibold text-base flex items-center gap-2 mb-2">
      {icon} {title}
    </h3>
    <div className="space-y-2">{children}</div>
  </div>
);
