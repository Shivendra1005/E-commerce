import { TopBar } from '../component/TopBar';
import Footer from '../component/Footer';
import { useContext, useEffect, useState } from 'react';
import { getUser } from '../api/api';
import { ShopContext } from '../context/ShopContext';
import { Spinner } from '../component/Spinner';

export function Profile() {
  const [user, setUser] = useState({});
  const { loading, setLoading, token } = useContext(ShopContext);

  useEffect(() => {
    setLoading(true);
    getUser(token)
      .then((data) => setUser(data.user))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token, setLoading]);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      {loading ? (
        <div className="flex-grow flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex-grow py-16 px-6 flex items-center justify-center bg-[var(--bg-secondary)]">
          <div className="w-full max-w-md">
            <div className="bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-color)] shadow-[var(--shadow-md)] p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  Profile
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  Your account information
                </p>
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-8 relative">
                <div className="w-28 h-28 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border-4 border-[var(--bg-primary)] shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="absolute bottom-1 right-[calc(50%-56px)] w-6 h-6 bg-emerald-500 rounded-full border-3 border-white flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-4 bg-[var(--bg-secondary)] rounded-2xl p-5">
                <InfoRow label="Username" value={user?.username} />
                <InfoRow label="Email" value={user?.email} />
                {user?.role && (
                  <InfoRow label="Role" value={user.role} capitalize />
                )}
              </div>

              {/* Account Status */}
              <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    Account Status
                  </p>
                  <p className="text-xs text-emerald-600">
                    Your account is active and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function InfoRow({ label, value, capitalize }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>
      <span
        className={`text-sm font-semibold text-[var(--text-primary)] text-right ${
          capitalize ? 'capitalize' : ''
        }`}
      >
        {value || '-'}
      </span>
    </div>
  );
}
