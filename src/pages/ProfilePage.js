import React, { useState } from 'react';
import Avatar from '../components/ui/Avatar';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';
import ChangePasswordModal from "../components/ChangePasswordModal"; // Adjust path if needed

const ProfilePage = () => {
    const { user, loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (!user) {
        return <p>No user found. Please login again.</p>;
    }

    const { name, email, role, avatarUrl } = user;

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <Card title="My Profile">
                <div className="flex items-center space-x-4 mb-4">
                    <Avatar src={avatarUrl} fallback={name?.[0]} size="lg" />
                    <div>
                        <h2 className="text-xl font-semibold">{name}</h2>
                        <p className="text-gray-500 text-sm capitalize">{role}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <Input label="Full Name" value={name} readOnly />
                    <Input label="Email" value={email} readOnly />
                    <Input label="Role" value={role} readOnly />
                </div>

                <div className="mt-6 text-right">
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                        Change Password
                    </Button>
                </div>
            </Card>

            {isModalOpen && <ChangePasswordModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default ProfilePage;
