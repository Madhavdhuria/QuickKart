import AdminHeader from "../components/AdminHeader";

const AdminDashBoard = () => {
  return (
    <>
      <section className="px-6 py-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, Admin 👋
          </h1>
          <p className="text-gray-600 mb-6">
            Here you can manage products, orders, users, and view analytics.
          </p>
          <div className="bg-white shadow-md rounded-xl p-6 border">
            <p className="text-lg font-medium text-gray-700">
              🧭 Use the navigation bar to get started managing your store.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashBoard;
