import React, { useState } from "react";
import styled from "styled-components";
import { getUserById, updatePassword } from "../../api/user";
import { User } from "../../types/User";
import Page from "../../ui-components/Page";
import Section from "../../ui-components/Section";
import { useFetch } from "../../hooks/useFetch";
import LoaderWrapper from "../../ui-components/LoaderWrapper";

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: black;
  padding: 20px;
`;

const UserInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  color: black;
  width: 300px;
`;

const Subtitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 5px;
  color: white;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  padding: 5px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
  width: 150px;
`;

const TeamList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TeamItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  margin-top: 10px;
  width: 300px;
`;

const TeamLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const ProfilePage: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchUser = async (): Promise<User> => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      const response = await getUserById(userId);
      return response.data;
    }
    throw new Error("User not found");
  };

  const { data: user, loading, error: fetchError } = useFetch(fetchUser, []);

  const handleChangePassword = () => {
    setShowPasswordField(true);
  };

  const handleConfirmPassword = async () => {
    if (user && newPassword) {
      try {
        await updatePassword(user.id.toString(), newPassword);
        setSuccess("Contraseña actualizada con éxito");
        setShowPasswordField(false);
        setNewPassword("");
        setError(null);
      } catch (error: any) {
        console.error("Error updating password:", error);
        setError(error.response?.data?.message || "Failed to update password");
        setSuccess(null);
      }
    }
  };

  return (
    <Page>
      <Section title={"Perfil"}>
        <LoaderWrapper loading={loading} error={fetchError}>
          <UserInfo>
            <Subtitle>Username</Subtitle>
            <UserInfoItem>
              <span>{user?.username}</span>
            </UserInfoItem>
            <Subtitle>Email</Subtitle>
            <UserInfoItem>
              <span>{user?.mail}</span>
            </UserInfoItem>
            <Subtitle>Subscription</Subtitle>
            <UserInfoItem>
              <span>{user?.premium ? "Premium" : "Basic"}</span>
            </UserInfoItem>
            <Subtitle>Favorite Teams</Subtitle>
            <TeamList>
              {user?.teams.map((team: any) => (
                <TeamItem key={team.id}>
                  <TeamLogo src={team.logo} alt={team.name} />
                  <span>{team.name}</span>
                </TeamItem>
              ))}
            </TeamList>
            <Button onClick={handleChangePassword}>Change Password</Button>
            {showPasswordField && (
              <>
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button onClick={handleConfirmPassword}>Confirm</Button>
              </>
            )}
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </UserInfo>
        </LoaderWrapper>
      </Section>
    </Page>
  );
};

export default ProfilePage;
