import { useState, useEffect } from 'react';
import { get, put, post } from '../../utils/apiMethods';
import { API } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';

const VendorSettings = () => {
  const [form, setForm] = useState({
    returnPolicy: '7_days',
    shippingCharge: 99, freeShippingThreshold: 999,
  });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [twoFA, setTwoFA] = useState({ enabled: false, qrCode: '', verifyToken: '', step: 'idle' });
  const [seoForm, setSeoForm] = useState({ metaTitle: '', metaDescription: '', storeSlug: '' });

  useEffect(() => {
    get(API.VENDORS.PROFILE).then(({ data }) => {
      const v = data.vendor;
      setForm({
        returnPolicy: v.returnPolicy || '7_days',
        shippingCharge: v.settings?.shippingCharge || 99,
        freeShippingThreshold: v.settings?.freeShippingThreshold || 999,
      });
      setTwoFA(prev => ({ ...prev, enabled: v.twoFactorEnabled || false }));
      if (v.seo) setSeoForm({
        metaTitle: v.seo.metaTitle || '',
        metaDescription: v.seo.metaDescription || '',
        storeSlug: v.storeSlug || '',
      });
    }).catch(() => {});
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      await put(API.VENDORS.PROFILE, {
        returnPolicy: form.returnPolicy,
        settings: { shippingCharge: form.shippingCharge, freeShippingThreshold: form.freeShippingThreshold },
      });
      toast.success('Settings saved');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return toast.error('Passwords do not match');
    try {
      await put(API.AUTH.UPDATE_PASSWORD, { currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword });
      toast.success('Password updated');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const enable2FA = async () => {
    try {
      const { data } = await post(API.AUTH.ENABLE_2FA);
      setTwoFA({ ...twoFA, qrCode: data.qrCode || data.otpauthUrl, step: 'verify' });
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const verify2FA = async () => {
    try {
      await post(API.AUTH.VERIFY_2FA, { token: twoFA.verifyToken });
      setTwoFA({ ...twoFA, enabled: true, step: 'idle', qrCode: '', verifyToken: '' });
      toast.success('2FA enabled');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const disable2FA = async () => {
    try {
      await post(API.AUTH.DISABLE_2FA);
      setTwoFA({ ...twoFA, enabled: false });
      toast.success('2FA disabled');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const updateSEO = async (e) => {
    e.preventDefault();
    try {
      await put(API.VENDORS.STORE_SEO_UPDATE, { metaTitle: seoForm.metaTitle, metaDescription: seoForm.metaDescription, storeSlug: seoForm.storeSlug });
      toast.success('SEO settings saved');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 max-w-2xl">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6">Store Settings</h1>

      {/* Shipping & Returns */}
      <form onSubmit={save} className="bg-white rounded-lg shadow-sm overflow-hidden p-3 sm:p-4 md:p-6 space-y-4 mb-6">
        <h3 className="text-sm font-medium uppercase tracking-wider">Shipping & Returns</h3>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Return Policy</label><select value={form.returnPolicy} onChange={(e) => setForm({ ...form, returnPolicy: e.target.value })} className="input-luxe text-sm w-full min-h-[44px]">
          <option value="7_days">7 Days Return</option><option value="10_days">10 Days Return</option><option value="no_return">No Return</option>
        </select></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Shipping Charge (₹)</label><input type="number" value={form.shippingCharge} onChange={(e) => setForm({ ...form, shippingCharge: Number(e.target.value) })} className="input-luxe text-sm w-full min-h-[44px]" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Above (₹)</label><input type="number" value={form.freeShippingThreshold} onChange={(e) => setForm({ ...form, freeShippingThreshold: Number(e.target.value) })} className="input-luxe text-sm w-full min-h-[44px]" /></div>
        </div>
        <Button type="submit" className="w-full sm:w-auto">Save Settings</Button>
      </form>

      {/* Password Change */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden p-3 sm:p-4 md:p-6 space-y-4 mb-6">
        <h3 className="text-sm font-medium uppercase tracking-wider">Change Password</h3>
        <form onSubmit={updatePassword} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label><input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} className="input-luxe text-sm w-full min-h-[44px]" required /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">New Password</label><input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="input-luxe text-sm w-full min-h-[44px]" required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label><input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} className="input-luxe text-sm w-full min-h-[44px]" required /></div>
          </div>
          <Button type="submit" className="w-full sm:w-auto">Update Password</Button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden p-3 sm:p-4 md:p-6 space-y-4 mb-6">
        <h3 className="text-sm font-medium uppercase tracking-wider">Two-Factor Authentication</h3>
        {twoFA.enabled ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-sm text-green-600">2FA is enabled</p>
            <button onClick={disable2FA} className="text-sm text-danger hover:underline min-h-[44px] flex items-center">Disable</button>
          </div>
        ) : twoFA.step === 'verify' ? (
          <div className="space-y-4">
            {twoFA.qrCode && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Scan this QR code with your authenticator app:</p>
                <img src={twoFA.qrCode} alt="2FA QR Code" className="w-40 h-40 border border-border rounded" />
              </div>
            )}
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label><input value={twoFA.verifyToken} onChange={(e) => setTwoFA({ ...twoFA, verifyToken: e.target.value })} className="input-luxe text-sm w-full min-h-[44px]" placeholder="Enter 6-digit code" /></div>
            <Button onClick={verify2FA} className="w-full sm:w-auto">Verify & Enable</Button>
          </div>
        ) : (
          <Button onClick={enable2FA} className="w-full sm:w-auto">Enable 2FA</Button>
        )}
      </div>

      {/* Store SEO */}
      <form onSubmit={updateSEO} className="bg-white rounded-lg shadow-sm overflow-hidden p-3 sm:p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wider">Store SEO</h3>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label><input value={seoForm.metaTitle} onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })} className="input-luxe text-sm w-full min-h-[44px]" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label><textarea value={seoForm.metaDescription} onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })} className="input-luxe text-sm w-full h-20 min-h-[44px]" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Store Slug</label><input value={seoForm.storeSlug} onChange={(e) => setSeoForm({ ...seoForm, storeSlug: e.target.value })} className="input-luxe text-sm w-full min-h-[44px]" /></div>
        <Button type="submit" className="w-full sm:w-auto">Update SEO</Button>
      </form>
    </div>
  );
};

export default VendorSettings;
