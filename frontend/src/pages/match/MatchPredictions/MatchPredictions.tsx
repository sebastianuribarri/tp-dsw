import { useState } from "react";
import styled from "styled-components";
import { createPrediction } from "../../../api/prediction";

const PredictionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
`;

const PredictionSelect = styled.select`
  padding: 10px;
  margin: 5px;
  font-size: 1rem;
  text-align: center;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;

interface MatchPredictionProps {
  matchId: number;
}

const MatchPrediction = ({ matchId }: MatchPredictionProps) => {
  const [prediction, setPrediction] = useState<string>("");

  const handlePredictionSubmit = async () => {
    if (!prediction) {
      alert("Please select a prediction.");
      return;
    }

    try {
      // Create a prediction object that matches the API's expected structure
      const predictionData = {
        match: matchId,
        user: "currentUserId", // Replace with actual user ID
        value: prediction,
      };

      await createPrediction(predictionData);
      alert("Prediction submitted successfully.");
    } catch (error) {
      console.error("Error submitting prediction:", error);
    }
  };

  return (
    <PredictionContainer>
      <h3>Predict the Outcome</h3>
      <label>
        Prediction:
        <PredictionSelect
          value={prediction}
          onChange={(e) => setPrediction(e.target.value)}
        >
          <option value="">Select Result</option>
          <option value="win">Win</option>
          <option value="lose">Lose</option>
          <option value="draw">Draw</option>
        </PredictionSelect>
      </label>
      <SubmitButton onClick={handlePredictionSubmit}>Submit Prediction</SubmitButton>
    </PredictionContainer>
  );
};

export default MatchPrediction;
