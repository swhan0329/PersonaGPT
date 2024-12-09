import axios from "axios";

const API_URL = "https://<your-api-id>.execute-api.us-west-2.amazonaws.com/submit";

export const submitAnswers = async (answers) => {
  try {
    const response = await axios.post(API_URL, {
      location: "South Korea",
      region: "Seoul",
      answers,
    });
    return response.data;
  } catch (error) {
    console.error("Error while submitting answers:", error);
    return { message: "Error occurred. Please try again later." };
  }
};
