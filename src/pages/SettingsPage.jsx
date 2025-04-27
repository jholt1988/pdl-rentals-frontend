
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SettingsPage = () => {
  const [timezone, setTimezone] = useState('UTC');
  const [language, setLanguage] = useState('English');

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saving settings...', { timezone, language });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Card title="Account Settings">
        <form onSubmit={handleSave} className="space-y-6">
          <Input
            label="Timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            placeholder="Enter your timezone"
          />
          <Input
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Preferred language"
          />

          <div className="text-right">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Card>

      <Card title="Notification Preferences">
        <form className="space-y-4">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="emailNotifications" defaultChecked />
            <label htmlFor="emailNotifications" className="text-sm">Receive email notifications</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="smsNotifications" />
            <label htmlFor="smsNotifications" className="text-sm">Receive SMS alerts</label>
          </div>
          <div className="text-right">
            <Button type="submit">Update Preferences</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SettingsPage;
