import axios from "axios";

export const fetchJokes = async () => {
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/jokes/ten");
    return response.data;
  } catch (error) {
    console.error("Error al obtener chistes:", error);
    throw error;
  }
};