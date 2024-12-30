import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
    const [user, setUser] = useState(null); 
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });
    const navigate = useNavigate();
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const userId = parsedUser._id;
            fetchUserProfile(userId);
        } else {
            console.error("No user found in local storage");
        }
    }, []);

    const fetchUserProfile = async (id) => {
        try {
            const response = await fetch(`/userprofile/${id}`);
            const json = await response.json();
            if (response.ok) {
                setUser(json);
                setUpdatedUser({ name: json.name, email: json.email });
            } else {
                console.error("Failed to fetch user profile");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/userprofile/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });

            const json = await response.json();

            if (response.ok) {
                console.log("Profile updated:", json);
                setIsEditing(false);
                setUser(json); 
            } else {
                console.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/userprofile/${user._id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("User deleted");
                localStorage.removeItem("user");
                navigate("/auth/login"); 
            } else {
                console.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handlePasswordChange = async () => {
        try {
            const response = await fetch(`/auth/change-password/${user._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: newPassword }),
            });
    
            if (response.ok) {
                console.log("Password updated successfully");
                setIsChangingPassword(false);
                setNewPassword('');
            } else {
                console.error("Failed to update password");
            }
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    if (user === null) {
        return <p>Loading...</p>;
    }

    return (
        <div className="theme">
            <div className="profile-card">
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={updatedUser.name}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                        />
                        <input
                            type="email"
                            value={updatedUser.email}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                        />
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <h4>{user?.name}</h4> 
                        <p>{user?.email}</p>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                        
                        <button onClick={() => setIsChangingPassword(!isChangingPassword)}>
                            {isChangingPassword ? "Cancel Change Password" : "Change Password"}
                        </button>
                        {isChangingPassword && (
                            <div className="change-password-form">
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button onClick={handlePasswordChange}>Update Password</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;