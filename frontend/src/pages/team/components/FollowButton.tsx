import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { followTeam, unfollowTeam, getUserById } from "../../../api/user"; // Adjust the import path as needed

interface FollowButtonProps {
  teamId: number;
}

const StyledButton = styled.button<{ isFollowing: boolean }>`
  background-color: ${(props) => (props.isFollowing ? "#444" : "#167f45")};
  color: white;
  border-radius: 9999px;
  padding: 5px 15px;
  cursor: pointer;
  margin-right: 15px;
  @media (min-width: 768px) {
    margin-right: 20px;
  }
  &:hover {
    background-color: ${(props) => (props.isFollowing ? "#444" : "#008641")};
  }
`;

const FollowButton: React.FC<FollowButtonProps> = ({ teamId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    const fetchUserTeams = async () => {
      try {
        if (userId) {
          const { data } = await getUserById(userId);
          const userTeams = data.teams || [];
          setIsFollowing(
            userTeams.some((team: { id: number }) => team.id === teamId)
          );
        }
      } catch (error) {
        console.error("Error fetching user teams:", error);
      }
    };

    fetchUserTeams();
  }, [teamId]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowTeam(userId as string, teamId);
      } else {
        await followTeam(userId as string, teamId);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  return (
    <StyledButton isFollowing={isFollowing} onClick={handleFollow}>
      {isFollowing ? "Siguiendo" : "Seguir"}
    </StyledButton>
  );
};

export default FollowButton;
